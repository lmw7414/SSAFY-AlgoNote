package com.ssafy.algonote.note.dto;

import com.ssafy.algonote.problem.domain.Problem;
import lombok.Builder;

@Builder
public record BookmarkProblemResDto(
        Long id,
        String title,
        int tier
) {
    public static BookmarkProblemResDto from(Problem problem) {
        return BookmarkProblemResDto.builder()
                .id(problem.getId())
                .title(problem.getTitle())
                .tier(problem.getTier())
                .build();
    }
}
