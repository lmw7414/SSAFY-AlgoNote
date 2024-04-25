package com.ssafy.algonote.member.service;

import java.util.concurrent.TimeUnit;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {
    @Autowired
    private StringRedisTemplate redisTemplate;

    public void save(String email, String data, long timeout, TimeUnit unit){
        redisTemplate.opsForValue().set(email, data, timeout, unit);
    }

    public String getData(String email) {
        return redisTemplate.opsForValue().get(email);
    }
}
