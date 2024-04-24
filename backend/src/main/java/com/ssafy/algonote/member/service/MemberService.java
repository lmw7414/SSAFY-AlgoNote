package com.ssafy.algonote.member.service;

import com.ssafy.algonote.member.dto.request.SignUpRequestDto;
import com.ssafy.algonote.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;

    public Long signUp(SignUpRequestDto signUpRequestDto) {

    }
}
