package com.ssafy.algonote.member.controller;

import com.ssafy.algonote.member.dto.request.SignUpReqDto;
import com.ssafy.algonote.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/auth")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("test");
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> signUp(SignUpReqDto signUpReqDto) {
        Long id = memberService.signUp(signUpReqDto);
        return ResponseEntity.ok().build();
    }
}
