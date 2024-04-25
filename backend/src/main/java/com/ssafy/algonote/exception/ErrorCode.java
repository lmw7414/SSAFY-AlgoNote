package com.ssafy.algonote.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, "해당 멤버를 찾을 수 없습니다."),
    NOT_FOUND_NOTE(HttpStatus.NOT_FOUND, "해당 노트를 찾을 수 없습니다."),
    NOT_FOUND_REVIEW(HttpStatus.NOT_FOUND, "해당 리뷰를 찾을 수 없습니다."),
    INVALID_PATH(HttpStatus.NOT_FOUND, "유효하지 않은 경로입니다."),
    NO_AUTHORITY(HttpStatus.NOT_FOUND, "해당 요청에 대한 권한이 없습니다."),
    WRONG_PASSWORD(HttpStatus.NOT_ACCEPTABLE, "비밀번호가 일치하지 않습니다."),
    BLANK_TOKEN_HEADER(HttpStatus.UNAUTHORIZED, "헤더에 토큰이 없습니다."),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    DUPLICATE_NICKNAME(HttpStatus.CONFLICT, "이미 존재하는 닉네임입니다."),
    UNABLE_TO_SEND_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 전송에 실패했습니다."),
    NO_SUCH_ALGORITHM(HttpStatus.INTERNAL_SERVER_ERROR, "알고리즘이 존재하지 않습니다."),
    MEMBER_INVALID(HttpStatus.UNAUTHORIZED, "토큰에 해당하는 유저가 없습니다"),
    INVALID_LINE_RANGE(HttpStatus.BAD_REQUEST, "endLine은 startLine보다 작을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String detail;

}