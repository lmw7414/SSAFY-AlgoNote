package com.ssafy.algonote.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.dto.request.LoginReqDto;
import com.ssafy.algonote.member.dto.request.SignUpReqDto;
import com.ssafy.algonote.member.dto.response.LoginReturnDto;
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

    @Test
    @Transactional
    void loginSuccessTest(){
        LoginReqDto loginReqDto = LoginReqDto.builder()
            .email("wlskaka4@gmail.com")
            .password("1233")
            .build();

        LoginReturnDto login = memberService.login(loginReqDto);
        assertThat(login.email()).isEqualTo("wlskaka4@gmail.com");

    }

    @Test
    @Transactional
    void loginEmailFailTest(){
        LoginReqDto loginReqDto = LoginReqDto.builder()
            .email("wlskaka5@gmail.com")
            .password("1233")
            .build();

        CustomException exception = assertThrows(CustomException.class, ()->{
            memberService.login(loginReqDto);
        });
        System.out.println("exception.getErrorCode() = " + exception.getErrorCode());
        assertEquals(ErrorCode.NOT_FOUND_ID, exception.getErrorCode());

    }
    @Test
    @Transactional
    void loginPasswordFailTest() {
        LoginReqDto loginReqDto = LoginReqDto.builder()
            .email("wlskaka4@gmail.com")
            .password("1234")
            .build();

        CustomException exception = assertThrows(CustomException.class, () -> {
            memberService.login(loginReqDto);
        });
        System.out.println("exception.getErrorCode() = " + exception.getErrorCode());
        assertEquals(ErrorCode.WRONG_PASSWORD, exception.getErrorCode());
    }
}