package com.ssafy.algonote.notification.service;

import com.ssafy.algonote.notification.domain.Notification;
import com.ssafy.algonote.notification.dto.response.NotificationResDto;
import com.ssafy.algonote.notification.repository.EmitterRepository;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final EmitterRepository emitterRepository;

    public SseEmitter subscribe(Long memberId, String lastEventId) {
        String emitterId = memberId + "_" + System.currentTimeMillis();  // 데이터가 유실된 시점을 파악할 수 있으므로 저장된 key값 비교를 통해 유실된 데이터만 재전송한다
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(emitterId, emitter);

        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        sendToClient(emitter, emitterId, "EventStream Created. [memberId=" + memberId + "]");

        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithId(String.valueOf(memberId));
            events.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
        }

        return emitter;
    }

    public void notify(Long memberId, String content) {
        Notification notification = Notification.of(memberId, content);
        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllStartWithById(String.valueOf(memberId));
        sseEmitters.forEach(
            (key, emitter) -> {
                emitterRepository.saveEventCache(key, notification);
                sendToClient(emitter, key, NotificationResDto.from(notification));
            }
        );
    }

    /**
     * 클라이언트에게 데이터를 전송
     *
     * @param emitterId   - 데이터를 받을 사용자의 아이디
     * @param data - 전송할 데이터
     */
    private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().id(String.valueOf(emitterId)).name("sse").data(data));
            } catch (IOException exception) {
                emitterRepository.deleteById(emitterId);
                emitter.completeWithError(exception);
            }
        }
    }

}