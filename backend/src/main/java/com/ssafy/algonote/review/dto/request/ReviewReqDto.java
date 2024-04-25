package com.ssafy.algonote.review.dto.request;

public record ReviewReqDto(
    int startLine,
    int endLine,
    String content
) { }