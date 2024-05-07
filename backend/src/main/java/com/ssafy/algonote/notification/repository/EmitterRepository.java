package com.ssafy.algonote.notification.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Repository
public class EmitterRepository {

    private Map<String, SseEmitter> emitterMap = new HashMap<>();  // TODO: SseEmitter의 영속화 고려

    public SseEmitter save(String id, SseEmitter sseEmitter) {
        emitterMap.put(id, sseEmitter);
        return sseEmitter;
    }

    public Optional<SseEmitter> getById(String id) {
        return Optional.ofNullable(emitterMap.get(id));
    }

    public void deleteById(String id) {
        emitterMap.remove(id);
    }

    public Map<String, SseEmitter> findAllStartWithById(String id) {
        return emitterMap.entrySet().stream()
            .filter(entry -> id.equals(entry.getKey()))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

}