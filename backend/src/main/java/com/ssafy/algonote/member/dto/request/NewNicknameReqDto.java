package com.ssafy.algonote.member.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;

public record NewNicknameReqDto(
        String nickname
) {
    @JsonCreator
    public NewNicknameReqDto {
    }
}
