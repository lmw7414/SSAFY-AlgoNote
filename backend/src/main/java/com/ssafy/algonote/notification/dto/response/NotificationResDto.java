package com.ssafy.algonote.notification.dto.response;

import com.ssafy.algonote.notification.domain.Notification;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record NotificationResDto(
    Long receiverId,
    String content,
    boolean isRead,
    LocalDateTime createdAt
) {
    public static NotificationResDto from(Notification entity) {
        return NotificationResDto.builder()
            .receiverId(entity.getReciever().getId())
            .content(entity.getContent())
            .createdAt(entity.getCreatedAt())
            .build();
    }
}