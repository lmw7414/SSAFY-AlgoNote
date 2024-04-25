package com.ssafy.algonote.review.dto.response;

import com.ssafy.algonote.member.dto.response.MemberResDto;
import com.ssafy.algonote.review.domain.Review;
import lombok.Builder;

@Builder
public record ReviewResDto(
    MemberResDto member,
    int startLine,
    int endLine,
    String content
) {
    public static ReviewResDto from(Review review) {
        return ReviewResDto.builder()
            .member(MemberResDto.from(review.getMember()))
            .startLine(review.getStartLine())
            .endLine(review.getEndLine())
            .content(review.getContent())
            .build();
    }
}