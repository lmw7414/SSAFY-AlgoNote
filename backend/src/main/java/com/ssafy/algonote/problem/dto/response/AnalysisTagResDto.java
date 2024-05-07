package com.ssafy.algonote.problem.dto.response;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record AnalysisTagResDto(
    String tag,
    int noteCount,
    int score,
    LocalDateTime lastSolvedDate,
    int problemCount
) {

}
