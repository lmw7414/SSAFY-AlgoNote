package com.ssafy.grading.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CodeInputVerificationTest {

    // 띄어쓰기 테스트

    @Test
    void test() {
        String input ="1 \n 2\n 3\n4 \n";
        String correct = "1\n2\n3\n4\n";
        assertEquals(correct,normalizeNewlines(input));
    }

    private static String normalizeNewlines(String input) {
        // 정규 표현식으로 개행 주변의 공백(스페이스, 탭 포함)을 찾아서 개행으로만 대체
        return input.replaceAll("(?m)^[ \t]*\n[ \t]*|[ \t]*\n[ \t]*$", "\n");
    }

}