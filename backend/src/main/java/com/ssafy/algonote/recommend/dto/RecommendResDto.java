package com.ssafy.algonote.recommend.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record RecommendResDto(
    int problemCount,
    List<RecommendProblemResDto> problems
) {

}
