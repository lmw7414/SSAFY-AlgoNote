package com.ssafy.algonote.search.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Builder;

@Builder
public record SearchResDto(
    @JsonProperty("notes") List<NoteSearchResDto> noteSearchResDto,
    @JsonProperty("problems") List<ProblemSearchResDto> problemSearchResDto
) {
    public static SearchResDto from(List<NoteSearchResDto> noteSearchResDto, List<ProblemSearchResDto> problemSearchResDto) {
        return SearchResDto.builder()
            .noteSearchResDto(noteSearchResDto)
            .problemSearchResDto(problemSearchResDto)
            .build();
    }
}
