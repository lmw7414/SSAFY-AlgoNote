package com.ssafy.grading.service;

import com.ssafy.grading.dto.ExecutionResult;
import com.ssafy.grading.exception.ErrorCode;
import com.ssafy.grading.exception.GradeApplicationException;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Comparator;
import java.util.UUID;
import java.util.concurrent.*;
import java.util.stream.Collectors;

import static com.ssafy.grading.util.CodeInputVerification.normalizeNewlines;

@Service
public class PythonExecutorService {

    private static final String PYTHON_RUNNER = "python3";

    public ExecutionResult compileAndExecute(String code, String input, String expected) {
        String dirPath = UUID.randomUUID() + "/";
        String pythonFile = dirPath + "script.py";
        String inputFileName = dirPath + "input.txt";
        try {
            File directory = new File(dirPath);
            if (!directory.exists())
                directory.mkdir();
            // 파이썬 코드를 파일로 저장
            code = addMeasureCode(code);
            System.out.println(code);
            Files.write(Paths.get(pythonFile), code.getBytes());
            Files.write(Paths.get(inputFileName), input.getBytes());

            // run 파이썬
            String output = run(pythonFile, inputFileName);
            String result = normalizeNewlines(getActualOutput(output));
            double executionTime = getUsedTime(output);
            double memoryUsage = getUsedMemory(output);
            boolean isCorrect = result.trim().equals(normalizeNewlines(expected.trim()));
            return new ExecutionResult(result, executionTime, memoryUsage, isCorrect);
        } catch (Exception e) {
            return new ExecutionResult(e.getMessage(), null, null, null);
        } finally {
            deleteFiles(Paths.get(dirPath));
        }
    }

    private String run(String pythonFile, String inputFileName) throws TimeoutException, IOException {
        if (!new File(pythonFile).exists())
            throw new FileNotFoundException("Python 파일이 생성되지 않았습니다.");

        ProcessBuilder runBuilder = new ProcessBuilder(PYTHON_RUNNER, pythonFile);
        runBuilder.redirectErrorStream(true);  // 표준 에러를 표준 출력에 합치기
        runBuilder.redirectInput(ProcessBuilder.Redirect.from(new File(inputFileName)));

        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<String> future = null;
        Process runProcess = runBuilder.start();
        try {
            future = executor.submit(() -> {
                String actualOutput = new BufferedReader(new InputStreamReader(runProcess.getInputStream()))
                        .lines().collect(Collectors.joining("\n"));
                int exitCode = runProcess.waitFor();
                if (exitCode != 0) {
                    throw new GradeApplicationException(ErrorCode.CODE_ERROR, actualOutput);
                }
                return actualOutput;
            });
            return future.get(12, TimeUnit.SECONDS);

        } catch (TimeoutException e) {
            future.cancel(true);  // 작업을 취소하고 프로세스를 종료하기
            throw new TimeoutException("실행 시간 초과");
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            executor.shutdownNow();  // 자원 회수
        }
    }

    private String getActualOutput(String output) {
        String[] outputToArray = output.split("\n");
        String[] result = Arrays.copyOfRange(outputToArray, 0, outputToArray.length - 2);
        return String.join("\n", result);
    }

    private double getUsedTime(String output) {
        String[] outputToArray = output.split("\n");
        return Double.parseDouble(outputToArray[outputToArray.length - 2]);
    }

    private double getUsedMemory(String output) {
        String[] outputToArray = output.split("\n");
        return Double.parseDouble(outputToArray[outputToArray.length - 1]);
    }

    private String addMeasureCode(String code) {
        // 시작 시간과 메모리 측정 코드
        String startCode = "import time\n" +
                "from memory_profiler import memory_usage\n" +
                "start_time = time.time()\n" +
                "start_memory = memory_usage(max_usage=True)\n\n";

        // 종료 시간과 메모리 측정 코드, 그리고 출력
        String endCode = "\n\nend_time = time.time()\n" +
                "end_memory = memory_usage(max_usage=True)\n" +
                "execution_time = (end_time - start_time) * 1000\n" +
                "used_memory = (end_memory - start_memory) * 1024\n" +
                "print(execution_time)\n" +
                "print(used_memory)\n";

        StringBuilder builder = new StringBuilder();
        builder.append(startCode);
        builder.append(code);
        builder.append(endCode);
        return builder.toString();
    }

    // 파일 제거
    private void deleteFiles(Path path) {
        try (var paths = Files.walk(path)) {
            // 내부 요소부터 외부 요소 순으로 정렬 후 삭제
            paths.sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
        } catch (IOException e) {
            throw new RuntimeException("파일 삭제 중 문제 발생");
        }
    }
}
