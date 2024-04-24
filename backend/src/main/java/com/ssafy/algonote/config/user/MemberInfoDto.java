package com.ssafy.algonote.config.user;

import com.ssafy.algonote.member.domain.MemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoDto {
    private Long userId;
    private String email;
    private String password;
    private String nickname;
    private MemberRole role;

}
