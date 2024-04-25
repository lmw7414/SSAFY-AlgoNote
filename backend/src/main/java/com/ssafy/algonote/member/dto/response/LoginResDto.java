package com.ssafy.algonote.member.dto.response;

import lombok.Builder;

@Builder
public record LoginResDto (
     Long memberId,
     String email,
     String nickname
){
    public static LoginResDto of(LoginReturnDto loginReturnDto) {
        return LoginResDto.builder()
            .memberId(loginReturnDto.memberId())
            .email(loginReturnDto.email())
            .nickname(loginReturnDto.nickname())
            .build();
    }
}
