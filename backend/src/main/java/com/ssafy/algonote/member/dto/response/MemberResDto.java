package com.ssafy.algonote.member.dto.response;

import com.ssafy.algonote.member.domain.Member;
import lombok.Builder;

@Builder
public record MemberResDto(  // TODO: 프로필이미지 컬럼 추가
     Long memberId,
     String nickname
){
    public static MemberResDto from(Member member) {
        return MemberResDto.builder()
            .memberId(member.getId())
            .nickname(member.getNickname())
            .build();
    }
}
