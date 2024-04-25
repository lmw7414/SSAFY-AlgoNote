package com.ssafy.algonote.member.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EmailServiceTest {
    @Autowired
    private EmailService emailService;

    @Test
    void saveTest(){
        emailService.save("test", "test", 10L, TimeUnit.SECONDS);
        assertEquals("test", emailService.getData("test"));
    }
}