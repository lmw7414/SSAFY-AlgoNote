package com.ssafy.algonote.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    NOT_FOUND_ID(HttpStatus.NOT_FOUND, "해당 아이디를 찾을 수 없습니다."),
    BLANK_TOKEN_HEADER(HttpStatus.UNAUTHORIZED, "헤더에 토큰이 없습니다."),
    MEMBER_INVALID(HttpStatus.UNAUTHORIZED, "토큰에 해당하는 유저가 없습니다");

    private final HttpStatus httpStatus;
    private final String detail;

}