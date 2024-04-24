package com.ssafy.algonote.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionController {

    @ExceptionHandler({
        CustomException.class
    })
    public ResponseEntity<ExceptionResponse> handlerCustomException(final CustomException e) {
        log.warn("api Exception : {}", e.getErrorCode());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(new ExceptionResponse(e.getErrorCode(), e.getMessage()));
    }

    public record ExceptionResponse(
        ErrorCode errorCode,
        String message
    ) {}

}
