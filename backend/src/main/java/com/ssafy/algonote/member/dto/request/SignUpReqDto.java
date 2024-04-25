package com.ssafy.algonote.member.dto.request;

import lombok.Builder;
import lombok.ToString;

@Builder
public record SignUpReqDto(String email,
                           String password,
                           String nickname) {

    public SignUpReqDto(String email, String password, String nickname) {
        this.email = email.trim();
        this.password = password;
        this.nickname = nickname;
    }
}
