package com.ssafy.algonote.note.dto;

import com.ssafy.algonote.member.domain.Member;
import lombok.Builder;

@Builder
public record BookmarkMemberResDto(
    String nickname
) {
    public static BookmarkMemberResDto from(Member member) {
        return BookmarkMemberResDto.builder()
            .nickname(member.getNickname())
            .build();
    }
}
