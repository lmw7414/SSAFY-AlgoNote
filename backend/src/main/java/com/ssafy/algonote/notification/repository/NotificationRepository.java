package com.ssafy.algonote.notification.repository;

import com.ssafy.algonote.notification.domain.Notification;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Repository;

@Repository
public class NotificationRepository {

    private Map<String, Notification> notificationMap = new HashMap<>();

    public void save(String id, Notification notification) {
        notificationMap.put(id, notification);
    }

    public Map<String, Notification> findAllStartWithById(String id) {
        return notificationMap.entrySet().stream()
            .filter(entry -> id.equals(entry.getKey()))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

}
