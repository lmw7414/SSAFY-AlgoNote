package com.ssafy.algonote.member.dto.request;

public class NewNicknameReqDto{
    String nickname;

    public NewNicknameReqDto(String nickname) {
        this.nickname = nickname.trim();
    }
}
