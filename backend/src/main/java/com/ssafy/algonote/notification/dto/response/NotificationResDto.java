package com.ssafy.algonote.notification.dto.response;

import com.ssafy.algonote.notification.domain.Notification;
import lombok.Builder;

@Builder
public record NotificationResDto(
    Long memberId,
    String content,
    boolean isRead
) {
    public static NotificationResDto from(Notification entity) {
        return NotificationResDto.builder()
            .memberId(entity.getMemberId())
            .content(entity.getContent())
            .build();
    }
}