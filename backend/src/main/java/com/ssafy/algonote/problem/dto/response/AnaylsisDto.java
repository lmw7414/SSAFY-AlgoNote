package com.ssafy.algonote.problem.dto.response;

import java.time.LocalDate;
import lombok.Builder;

@Builder
public record AnaylsisDto(
    String group,
    int score,
    LocalDate lastSolvedDate,
    int problemCount
) {

}
