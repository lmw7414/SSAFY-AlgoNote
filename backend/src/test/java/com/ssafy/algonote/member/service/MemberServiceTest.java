package com.ssafy.algonote.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.algonote.member.dto.request.SignUpReqDto;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    private MemberService memberService;


    @Test
    @Transactional
    void signUpTest(){
        // given
        SignUpReqDto signUpReqDto = SignUpReqDto.builder()
            .email("wlskaka4@gmail.com")
            .password("1234")
            .nickname("wlskaka4")
            .build();
        Long id = memberService.signUp(signUpReqDto);

        assertThat(id).isEqualTo(1L);
    }
}