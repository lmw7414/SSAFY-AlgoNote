package com.ssafy.algonote.notification.service;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.notification.domain.Notification;
import com.ssafy.algonote.notification.dto.response.NotificationResDto;
import com.ssafy.algonote.notification.repository.EmitterRepository;
import com.ssafy.algonote.notification.repository.NotificationRepository;
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
    private final NotificationRepository notificationRepository;

    /**
     * SseEmitter를 구독한다.
     *
     * @param memberId
     * @param lastEventId
     * @return
     */
    public SseEmitter subscribe(Long memberId, String lastEventId) {
        String emitterId = makeTimeIncludedId(memberId);  // 데이터가 유실된 시점을 파악할 수 있으므로 저장된 key값 비교를 통해 유실된 데이터만 재전송한다
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // SSE 연결이 이뤄진 후, 하나의 데이터도 전송되지 않으면 SseEmitter의 유효 시간이 끝난 후 503 Error가 발생하므로 더미 이벤트 전송
        String eventId = makeTimeIncludedId(memberId);
        sendEvent(emitter, eventId, emitterId, "EventStream Created. [memberId=" + memberId + "]");

        // 클라이언트가 미수신한 Event 목록이 존재할 경우 전송하여 Event 유실을 예방
        if (hasLostEvent(lastEventId)) {
            sendLostEvents(memberId, lastEventId, emitterId, emitter);
        }

        return emitter;
    }

    /**
     * memberId에 현재 시각을 붙여 id를 생성한다.
     *
     * @param memberId
     * @return
     */
    private static String makeTimeIncludedId(Long memberId) {
        return memberId + "_" + System.currentTimeMillis();
    }

    /**
     * 클라이언트가 미수신한 event가 존재하는지에 대한 여부 반환한다.
     *
     * @param lastEventId
     * @return
     */
    private static boolean hasLostEvent(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    /**
     * lastEventId를 기준으로 그 이후의 이벤트들을 전송한다.
     *
     * @param memberId - 알림을 받을 회원의 memberId
     * @param lastEventId - 마지막으로 받은 알림의 eventId
     * @param emitter
     */
    private void sendLostEvents(Long memberId, String lastEventId, String emitterId, SseEmitter emitter) {
        Map<String, Object> events = emitterRepository.findAllEventCacheStartWithId(String.valueOf(memberId));
        events.entrySet().stream()
            .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)  // lastEventId < entry.getKey() 인 경우. 즉, entry.getKey() 가 lastEventId 보다 이후에 생성된 id인 경우
            .forEach(entry -> sendEvent(emitter, entry.getKey(), emitterId, entry.getValue()));
    }

    /**
     * SseEmitter로 event 전송
     *
     * @param emitterId   - 데이터를 받을 사용자의 아이디
     * @param data - 전송할 데이터
     */
    private void sendEvent(SseEmitter emitter, String eventId, String emitterId, Object data) {
        if (emitter != null) {
            try {
                emitter.send(
                    SseEmitter.event()
                        .id(eventId)
                        .name("sse")
                        .data(data));
            } catch (IOException exception) {
                emitterRepository.deleteById(emitterId);
                emitter.completeWithError(exception);
            }
        }
    }

    /**
     * 외부 서비스 클래스에서 쓰일 알림 전송 메서드
     *
     * @param receiver - 알림을 받을 회원
     * @param content - 알림 내용
     */
    public void notify(Member receiver, String content) {
        Notification notification = notificationRepository.save(Notification.of(receiver, content));

        String receiverId = String.valueOf(receiver.getId());
        String eventId = receiverId + "_" + System.currentTimeMillis();

        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllStartWithById(String.valueOf(receiverId));
        sseEmitters.forEach(
            (key, emitter) -> {
                emitterRepository.saveEventCache(key, notification);
                sendEvent(emitter, eventId, key, NotificationResDto.from(notification));
            }
        );
    }

}