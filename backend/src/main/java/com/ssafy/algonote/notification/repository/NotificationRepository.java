package com.ssafy.algonote.notification.repository;

import com.ssafy.algonote.notification.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
