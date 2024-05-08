package com.ssafy.grading.service;

import com.ssafy.grading.dto.ExecutionResult;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Comparator;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CodeExecutorService {

    private static final String JAVA_COMPILER = "javac";
    private static final String JAVA_RUNNER = "java";

    public ExecutionResult compileAndExecute(String code, String input, String expected) {
        String dirPath = UUID.randomUUID() + "/";
        String className = "Main";
        String javaFile = dirPath + className + ".java";
        String inputFileName = dirPath + className + "Input.txt";
        try {
            File directory = new File(dirPath);
            if (!directory.exists())
                directory.mkdir();

            // 소스 코드와 입력 데이터를 파일로 저장
            int firstBrace = findFirstBrace(code);
            int lastBrace = findLastBrace(code, firstBrace);

            code = addMeasureCode(code, firstBrace, lastBrace);
            Files.write(Paths.get(javaFile), code.getBytes());
            Files.write(Paths.get(inputFileName), input.getBytes());

            // .java 컴파일
            compile(javaFile);

            // .class 파일 실행
            String output = run(dirPath, className, inputFileName);
            String result = getActualOutput(output);
            double executionTime = getUsedTime(output);
            double memoryUsage = getUsedMemory(output);
            boolean isCorrect = result.trim().equals(expected.trim());

            return new ExecutionResult(result, executionTime, memoryUsage, isCorrect);
        } catch (Exception e) {
            return new ExecutionResult(e.getMessage(), null, null, null);
        } finally {
            deleteFiles(Paths.get(dirPath));
        }
    }

    private void compile(String javaFile) throws IOException, InterruptedException {
        try {
            // Java 파일 컴파일하기
            ProcessBuilder compileBuilder = new ProcessBuilder(JAVA_COMPILER, "-encoding", "UTF-8", javaFile);
            Process compileProcess = compileBuilder.start();
            compileProcess.waitFor();
        } catch (IOException e) {
            throw new IOException("파일을 읽거나 쓰는 중 문제가 발생했습니다: " + e.getMessage(), e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // 현재 스레드의 인터럽트 상태를 다시 설정
            throw new InterruptedException("컴파일 과정이 중단되었습니다: " + e.getMessage());
        }
    }

    private String run(String dirPath, String className, String inputFileName) throws IOException, InterruptedException {
        try {
            if (!new File(dirPath + className + ".class").exists())
                throw new FileNotFoundException("Main.class 파일이 생성되지 않았습니다.");
            ProcessBuilder runBuilder = new ProcessBuilder(JAVA_RUNNER, "-cp", dirPath, className);
            runBuilder.redirectErrorStream(true);
            runBuilder.redirectInput(ProcessBuilder.Redirect.from(new File(inputFileName)));
            Process runProcess = runBuilder.start();

            // 실행 결과 읽기
            String actualOutput = new BufferedReader(new InputStreamReader(runProcess.getInputStream()))
                    .lines().collect(Collectors.joining("\n"));
            runProcess.waitFor();
            return actualOutput;
        } catch (IOException e) {
            throw new IOException(e.getMessage());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // 현재 스레드의 인터럽트 상태를 다시 설정
            throw new InterruptedException("프로세스 실행이 중단되었습니다: " + e.getMessage());
        }
    }

    private String getActualOutput(String output) {
        String[] outputToArray = output.split("\n");
        String[] result = Arrays.copyOfRange(outputToArray, 0, outputToArray.length - 2);
        return String.join("\n", result);
    }

    private double getUsedTime(String output) {
        String[] outputToArray = output.split("\n");
        return Double.parseDouble(outputToArray[outputToArray.length - 2]) / 1000000;
    }

    private double getUsedMemory(String output) {
        String[] outputToArray = output.split("\n");
        return Double.parseDouble(outputToArray[outputToArray.length - 1]) / 1024;
    }

    private String addMeasureCode(String code, int firstBrace, int lastBrace) {
        String startCode = "\n" +
                "Runtime.getRuntime().gc();" +
                "long startTime = System.nanoTime();\n";
        String endCode = "\n" +
                "long endTime = System.nanoTime();\n" +
                "long usedMemory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();\n" +
                "System.out.println(endTime - startTime);\n" +
                "System.out.println(usedMemory);\n";
        StringBuilder builder = new StringBuilder(code);
        builder.insert(lastBrace - 1, endCode);
        builder.insert(firstBrace + 1, startCode);
        return builder.toString();
    }

    private int findFirstBrace(String code) {
        int mainMethodIdx = code.indexOf("public static void main");
        return code.indexOf("{", mainMethodIdx);
    }

    private int findLastBrace(String code, int firstBrace) {
        if (firstBrace == -1)
            return -1;
        int braceCnt = 1;
        int idx = firstBrace + 1; // 첫번째 중괄 호 다음부터
        boolean inSingleLineComment = false;
        boolean inMultiLineComment = false;

        while (idx < code.length() && braceCnt > 0) {
            char ch = code.charAt(idx);
            char nextChar = idx + 1 < code.length() ? code.charAt(idx + 1) : '\0';

            if (!inMultiLineComment && !inSingleLineComment && ch == '/' && nextChar == '/') {  // 단일 주석인 경우
                inSingleLineComment = true;
                idx++;
            } else if (!inMultiLineComment && !inSingleLineComment && ch == '/' && nextChar == '*') { // 여러줄 주석인 경우
                inMultiLineComment = true;
                idx++;
            } else if (inSingleLineComment && ch == '\n') {
                inSingleLineComment = false;
            } else if (inMultiLineComment && ch == '*' && nextChar == '/') {
                inMultiLineComment = false;
                idx++;
            } else if (!inSingleLineComment && !inMultiLineComment) {
                if (ch == '{') braceCnt++;
                else if (ch == '}') braceCnt--;
            }
            idx++;
        }
        return braceCnt == 0 ? idx : -1;
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

