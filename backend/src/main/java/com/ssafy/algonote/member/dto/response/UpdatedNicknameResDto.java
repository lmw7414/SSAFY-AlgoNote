package com.ssafy.algonote.member.dto.response;

import lombok.Builder;

@Builder
public record UpdatedNicknameResDto (
        String updatedNickname
){
    public static UpdatedNicknameResDto of(String updatedNickname) {
        return UpdatedNicknameResDto.builder()
                .updatedNickname(updatedNickname)
                .build();
    }
}
