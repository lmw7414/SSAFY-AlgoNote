package com.ssafy.algonote.member.dto.request;

import lombok.*;

@Builder
public record EmailDupCheckReqDto(String email) {

    public EmailDupCheckReqDto(String email) {
        this.email = email.trim();
    }
}
