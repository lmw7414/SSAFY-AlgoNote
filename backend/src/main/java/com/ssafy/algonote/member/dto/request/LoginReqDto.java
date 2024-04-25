package com.ssafy.algonote.member.dto.request;


import lombok.Builder;

@Builder
public record LoginReqDto(String email, String password) {

    public LoginReqDto(String email, String password) {
        this.email = email.trim();
        this.password = password.trim();
    }
}