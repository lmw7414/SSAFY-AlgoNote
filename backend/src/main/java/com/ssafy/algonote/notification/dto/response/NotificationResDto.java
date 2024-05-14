package com.ssafy.algonote.notification.dto.response;

import com.ssafy.algonote.member.dto.response.MemberResDto;
import com.ssafy.algonote.notification.domain.Notification;
import com.ssafy.algonote.notification.domain.NotificationType;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record NotificationResDto(
    Long notificationId,
    NotificationType notificationType,
    String content,
    MemberResDto provider,
    boolean isRead,
    LocalDateTime createdAt
) {
    public static NotificationResDto from(Notification entity) {
        return NotificationResDto.builder()
            .notificationId(entity.getId())
            .notificationType(entity.getNotificationType())
            .content(entity.getContent())
            .provider(MemberResDto.from(entity.getProvider()))
            .isRead(entity.isRead())
            .createdAt(entity.getCreatedAt())
            .build();
    }
}