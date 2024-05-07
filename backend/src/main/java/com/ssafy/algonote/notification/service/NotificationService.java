package com.ssafy.algonote.notification.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.notification.domain.Notification;
import com.ssafy.algonote.notification.dto.response.NotificationResDto;
import com.ssafy.algonote.notification.repository.EmitterRepository;
import com.ssafy.algonote.notification.repository.NotificationRepository;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final static Long DEFAULT_TIMEOUT = 1000L * 60 * 60;  // 이 시간 만큼 SSE 연결이 유지되고, 시간이 지나면 자동으로 클라이언트에서 재연결 요청을

    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;

    public SseEmitter subscribe(Long userId, String lastEventId) {
        // 새로운 SseEmitter를 만들어 유저 ID로 SseEmitter를 저장한다.
        String currentId = userId + "_" + System.currentTimeMillis();  // 데이터가 유실된 시점을 파악할 수 있으므로 저장된 key값 비교를 통해 유실된 데이터만 재전송한다
        SseEmitter sseEmitter = emitterRepository.save(currentId, new SseEmitter(DEFAULT_TIMEOUT));

        // 세션이 종료될 경우 저장한 SseEmitter를 삭제한다.
        sseEmitter.onCompletion(() -> emitterRepository.deleteById(currentId));
        sseEmitter.onTimeout(() -> emitterRepository.deleteById(currentId));

        // 503 Service Unavailable 에러 방지를 위해 더미 이벤트 전송
        // SSE 연결이 이뤄진 후, 하나의 데이터도 전송되지 않으면 SseEmitter의 유효 시간이 끝난 후 503 Error 발생하므로
        try {
            sseEmitter.send(SseEmitter.event()
                .name("Connection Init")
                .data("Connection completed!"));
        } catch (IOException exception) {
            throw new CustomException(ErrorCode.NOTIFICATION_CONNECTION_ERROR);
        }

        // 클라이언트가 미수신한 Notification 목록이 존재할 경우 유실된 데이터들만 다시 보내준다.
        if (!lastEventId.isEmpty()) {
            Map<String, Notification> notifications = notificationRepository.findAllStartWithById(String.valueOf(userId));
            notifications.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendToClient(sseEmitter, entry.getKey(), entry.getValue()));
        }

        return sseEmitter;
    }

    public void send(Member receiver, String content) {
        Notification notification = createNotification(receiver, content);
        String memberId = String.valueOf(receiver.getId());

        // 로그인 한 유저의 SseEmitter 모두 가져오기
        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllStartWithById(memberId);
        sseEmitters.forEach(
            (key, emitter) -> {
                // 알람 데이터 캐시 저장(유실된 데이터 처리하기 위함)
                notificationRepository.save(key, notification);
                // 데이터 전송
                sendToClient(emitter, key, NotificationResDto.from(notification));
            }
        );
    }

    private Notification createNotification(Member receiver, String content) {
        return Notification.builder()
            .receiver(receiver)
            .content(content)
            .isRead(false)
            .build();
    }

    private void sendToClient(SseEmitter emitter, String id, Object data) {
        try {
            emitter.send(SseEmitter.event()
                .id(id)
                .name("sse")
                .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(id);
            throw new RuntimeException("연결 오류!");
        }
    }

}