package com.ssafy.algonote.notification.dto.request;

import com.ssafy.algonote.member.domain.Member;
import lombok.Builder;

@Builder
public record NotificationReqDto(
    Member receiver,
    String content
) {
}