package com.ssafy.algonote.member.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MailServiceTest {

    @Autowired
    private MailService mailService;

    @Test
    void sendMailTest(){
        mailService.sendEmail("wlskaka4@gmail.com", "test", "test");
        
    }

}