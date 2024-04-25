package com.ssafy.algonote.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Builder
public record LoginReturnDto(String token,
                             Long memberId,
                             String email,
                             String nickname,
                             String profileImg) {

}