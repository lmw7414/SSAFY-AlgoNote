package com.ssafy.algonote.member.dto.request;

public record NewNicknameReqDto(
        String nickname
) {
    public NewNicknameReqDto(String nickname) {
        this.nickname = nickname.trim();
    }
}
