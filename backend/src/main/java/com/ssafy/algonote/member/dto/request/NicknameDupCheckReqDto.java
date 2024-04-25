package com.ssafy.algonote.member.dto.request;

import lombok.*;


@Builder
public record NicknameDupCheckReqDto(String nickname) {

    public NicknameDupCheckReqDto(String nickname) {
        this.nickname = nickname.trim();
    }
}