package com.ssafy.grading.dto.request;

public record Request(
        String sourceCode,
        String inputData,
        String expectedOutput
) {
}
