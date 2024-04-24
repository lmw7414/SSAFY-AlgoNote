package com.ssafy.algonote.member.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NicknameDupCheckReqDto {
    String nickname;
}
