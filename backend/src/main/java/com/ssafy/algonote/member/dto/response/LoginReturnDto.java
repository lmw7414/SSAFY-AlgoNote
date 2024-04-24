package com.ssafy.algonote.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginReturnDto {
    private String token;
    private Long memberId;
    private String email;
    private String nickname;
}
