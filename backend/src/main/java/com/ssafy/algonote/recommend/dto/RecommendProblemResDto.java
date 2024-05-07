package com.ssafy.algonote.recommend.dto;

import lombok.Builder;

@Builder
public record RecommendProblemResDto(
    Long problemId,
    int tier,
    String problemTitle
) {

}
