package com.ssafy.algonote.notification.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    Long memberId;
    String content;
    boolean isRead;

    public static Notification of(Long memberId, String content) {
        return Notification.builder()
            .memberId(memberId)
            .content(content)
            .build();
    }

}
