package com.ssafy.algonote.search.dto.response;


import com.ssafy.algonote.problem.domain.ProblemDocument;
import com.ssafy.algonote.problem.domain.ProblemDocument.Tag;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;

@Builder
public record ProblemSearchResDto(
    Long problemId,
    String problemTitle,
    int tier,
    List<String> tags
) {

    public static ProblemSearchResDto from(ProblemDocument problemDocument){

        return ProblemSearchResDto.builder()
            .problemId(Long.parseLong(problemDocument.getId()))
            .problemTitle(problemDocument.getTitle())
            .tier(problemDocument.getTier())
            .tags(problemDocument.getTags().stream().map(Tag::getTag).toList())
            .build();
    }
}
