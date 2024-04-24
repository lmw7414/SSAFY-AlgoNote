package com.ssafy.algonote.problem.domain;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Tag {
    MATH("math", "수학"),
    IMPLEMENTATION("implementation", "구현"),
    DP("dp", "다이나믹 프로그래밍");

    private final String key;
    private final String nameKo;
}
