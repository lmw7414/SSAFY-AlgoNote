package com.ssafy.algonote.member.service;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.domain.MemberRole;
import com.ssafy.algonote.member.dto.request.SignUpReqDto;
import com.ssafy.algonote.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;

    public Long signUp(SignUpReqDto signUpReqDto) {
        log.info("signUp dto : {}", signUpReqDto);
        Member member = Member.builder()
            .email(signUpReqDto.getEmail())
            .password(signUpReqDto.getPassword())
            .nickname(signUpReqDto.getNickname())
            .role(MemberRole.USER)
            .build();

        return memberRepository.save(member).getId();
    }
}
