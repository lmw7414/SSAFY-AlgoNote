package com.ssafy.algonote.member.service;

import com.ssafy.algonote.config.jwt.JwtUtil;
import com.ssafy.algonote.config.user.MemberInfoDto;
import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.domain.MemberRole;
import com.ssafy.algonote.member.dto.request.EmailDupCheckReqDto;
import com.ssafy.algonote.member.dto.request.LoginReqDto;
import com.ssafy.algonote.member.dto.request.NicknameDupCheckReqDto;
import com.ssafy.algonote.member.dto.request.SignUpReqDto;
import com.ssafy.algonote.member.dto.response.LoginResDto;
import com.ssafy.algonote.member.dto.response.LoginReturnDto;
import com.ssafy.algonote.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;

    public Long signUp(SignUpReqDto signUpReqDto) {
        log.info("signUp dto : {}", signUpReqDto);
        Member member = Member.from(signUpReqDto);

        return memberRepository.save(member).getId();
    }

    public LoginReturnDto login(LoginReqDto loginReqDto){
        Member member = memberRepository.findByEmail(loginReqDto.email())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));

        if(!member.getPassword().equals(loginReqDto.password())) {
            throw new CustomException(ErrorCode.WRONG_PASSWORD);
        }

        MemberInfoDto memberInfoDto = MemberInfoDto.from(member);

        String token = jwtUtil.createAccessToken(memberInfoDto);

        return LoginReturnDto.builder()
            .token(token)
            .memberId(member.getId())
            .email(member.getEmail())
            .nickname(member.getNickname())
            .build();
    }

    public void emailDupCheck(EmailDupCheckReqDto emailDupCheckReqDto) {
        Member member = memberRepository.findByEmail(emailDupCheckReqDto.email())
                        .orElseThrow(()-> new CustomException(ErrorCode.DUPLICATE_EMAIL));
    }

    public void nicknameDupCheck(NicknameDupCheckReqDto nicknameDupCheckReqDto) {
        Member member = memberRepository.findByNickname(nicknameDupCheckReqDto.nickname())
                        .orElseThrow(() -> new CustomException(ErrorCode.DUPLICATE_NICKNAME));

    }
}
