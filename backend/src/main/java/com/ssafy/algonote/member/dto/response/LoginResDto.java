package com.ssafy.algonote.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
public record LoginResDto (
     Long memberId,
     String email,
     String nickname
){
    public static LoginResDto from(LoginReturnDto loginReturnDto) {
        return LoginResDto.builder()
            .memberId(loginReturnDto.memberId())
            .email(loginReturnDto.email())
            .nickname(loginReturnDto.nickname())
            .build();
    }
}
