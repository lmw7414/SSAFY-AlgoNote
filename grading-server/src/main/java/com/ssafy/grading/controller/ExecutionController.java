package com.ssafy.grading.controller;


import com.ssafy.grading.dto.ExecutionResult;
import com.ssafy.grading.dto.request.Request;
import com.ssafy.grading.service.JavaExecutorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ExecutionController {
    private final JavaExecutorService javaExecutorService;

    @PostMapping("/execute")
    public ResponseEntity<ExecutionResult> execute(@RequestBody Request request) {
        return ResponseEntity.ok(javaExecutorService.compileAndExecute(request.sourceCode(), request.inputData(), request.expectedOutput()));
    }

}
