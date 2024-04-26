package com.ssafy.algonote.problem.dto;

import java.util.Collection;
import java.util.Set;

public record TagWithProblemsResDto(
        Collection<ProblemResDto> problems
) {
    public static TagWithProblemsResDto from(Collection<ProblemResDto> dto) {
        return new TagWithProblemsResDto(dto);
    }
}
