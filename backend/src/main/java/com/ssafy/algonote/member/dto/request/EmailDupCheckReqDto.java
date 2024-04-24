package com.ssafy.algonote.member.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EmailDupCheckReqDto {
    String email;
}
