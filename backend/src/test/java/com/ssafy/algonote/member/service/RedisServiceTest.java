package com.ssafy.algonote.member.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RedisServiceTest {
    @Autowired
    private RedisService redisService;

    @Test
    void saveTest(){
        redisService.save("test", "test", 10L, TimeUnit.SECONDS);
        assertEquals("test", redisService.getData("test"));
    }
}