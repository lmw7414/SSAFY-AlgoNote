package com.ssafy.algonote.notification.dto.response;

import com.ssafy.algonote.notification.domain.Notification;
import com.ssafy.algonote.notification.domain.NotificationType;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record NotificationResDto(
    Long receiverId,
    NotificationType notificationType,
    String content,
    boolean isRead,
    LocalDateTime createdAt
) {
    public static NotificationResDto from(Notification entity) {
        return NotificationResDto.builder()
            .receiverId(entity.getReciever().getId())
            .notificationType(entity.getNotificationType())
            .content(entity.getContent())
            .isRead(entity.isRead())
            .createdAt(entity.getCreatedAt())
            .build();
    }
}