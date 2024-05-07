package com.ssafy.algonote.notification.dto.response;

import com.ssafy.algonote.notification.domain.Notification;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record NotificationResDto(
    Long notificationId,
    Long memberId,
    String content,
    boolean isRead,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt
) {
    public static NotificationResDto from(Notification entity) {
        return NotificationResDto.builder()
            .notificationId(entity.getId())
            .memberId(entity.getReceiver().getId())
            .content(entity.getContent())
            .createdAt(entity.getCreatedAt())
            .modifiedAt(entity.getModifiedAt())
            .build();
    }
}