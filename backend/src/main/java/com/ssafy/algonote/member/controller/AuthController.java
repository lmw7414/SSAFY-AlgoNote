package com.ssafy.algonote.member.controller;

import com.ssafy.algonote.member.dto.request.DestEmatilReqDto;
import com.ssafy.algonote.member.dto.request.EmailAuthReqDto;
import com.ssafy.algonote.member.dto.request.EmailDupCheckReqDto;
import com.ssafy.algonote.member.dto.request.LoginReqDto;
import com.ssafy.algonote.member.dto.request.NicknameDupCheckReqDto;
import com.ssafy.algonote.member.dto.request.SignUpReqDto;
import com.ssafy.algonote.member.dto.response.DupcheckResDto;
import com.ssafy.algonote.member.dto.response.EmailAuthResDto;
import com.ssafy.algonote.member.dto.response.LoginResDto;
import com.ssafy.algonote.member.dto.response.LoginReturnDto;
import com.ssafy.algonote.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("test");
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> signUp(@RequestBody SignUpReqDto signUpReqDto) {
        log.info("signUpReqDto : {}", signUpReqDto);
        memberService.signUp(signUpReqDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResDto> login (@RequestBody LoginReqDto loginReqDto) {
        log.info("loginReqDto : {}", loginReqDto);
        LoginReturnDto loginReturnDto = memberService.login(loginReqDto);


        LoginResDto loginResDto = LoginResDto.from(loginReturnDto);

        HttpHeaders header = new HttpHeaders();
        header.add("token", loginReturnDto.token());

        return new ResponseEntity<>(loginResDto, header, HttpStatus.OK);

    }

    @PostMapping("/email-dupcheck")
    public ResponseEntity<DupcheckResDto> emailDupCheck(@RequestBody EmailDupCheckReqDto emailDupCheckReqDto) {
        log.info("emailDupCheckReqDto : {}", emailDupCheckReqDto);
        boolean duplicated = memberService.emailDupCheck(emailDupCheckReqDto);
        return ResponseEntity.ok(new DupcheckResDto(duplicated));
    }

    @PostMapping("/nickname-dupcheck")
    public ResponseEntity<DupcheckResDto> nicknameDupCheck(@RequestBody NicknameDupCheckReqDto nicknameDupCheckReqDto) {
        log.info("nicknameDupCheckReqDto : {}", nicknameDupCheckReqDto);
        boolean duplicated = memberService.nicknameDupCheck(nicknameDupCheckReqDto);
        return ResponseEntity.ok(new DupcheckResDto(duplicated));
    }

    @PostMapping("/verification-requests")
    public ResponseEntity<Void> sendMessage(@Valid @RequestBody DestEmatilReqDto destEmatilReqDto) {
        log.info("destEmatilReqDto : {}", destEmatilReqDto);
        memberService.sendCodeToEmail(destEmatilReqDto.email());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/verification")
    public ResponseEntity<EmailAuthResDto> verifyCode(@Valid @RequestBody EmailAuthReqDto emailAuthReqDto) {
        log.info("emailAuthReqDto : {}", emailAuthReqDto);
        EmailAuthResDto emailAuthResDto = memberService.verifyCode(emailAuthReqDto);

        return ResponseEntity.ok(emailAuthResDto);
    }



}
