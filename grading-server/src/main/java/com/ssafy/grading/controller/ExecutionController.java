package com.ssafy.grading.controller;


import com.ssafy.grading.dto.ExecutionResult;
import com.ssafy.grading.dto.request.Request;
import com.ssafy.grading.service.JavaExecutorService;
import com.ssafy.grading.service.PythonExecutorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/execute")
@RequiredArgsConstructor
public class ExecutionController {
    private final JavaExecutorService javaExecutorService;
    private final PythonExecutorService pythonExecutorService;

    @PostMapping("/java")
    public ResponseEntity<ExecutionResult> executeJava(@RequestBody Request request) {
        return ResponseEntity.ok(javaExecutorService.compileAndExecute(request.sourceCode(), request.inputData(), request.expectedOutput()));
    }

    @PostMapping("/py")
    public ResponseEntity<ExecutionResult> executePython(@RequestBody Request request) {
        return ResponseEntity.ok(pythonExecutorService.compileAndExecute(request.sourceCode(), request.inputData(), request.expectedOutput()));
    }

    @PostMapping("/c")
    public ResponseEntity<ExecutionResult> executeC(@RequestBody Request request) {
        return ResponseEntity.ok(cExecutorService.compileAndExecute(request.sourceCode(), request.inputData(), request.expectedOutput()));
    }

}
