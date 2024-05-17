package com.ssafy.algonote.recommend.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record RecommendTagDto(
    String tag,
    List<Long> solvedProblemIds
) {
    public static RecommendTagDto of(String tag, List<Long> solvedProblemIds) {
        return RecommendTagDto.builder()
            .tag(tag)
            .solvedProblemIds(solvedProblemIds)
            .build();
    }
}
