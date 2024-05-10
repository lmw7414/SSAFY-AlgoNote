package com.ssafy.algonote.recommend.dto.response;


public record RecommendProblemResDto(
    Long problemId,
    int tier,
    String problemTitle) {
}