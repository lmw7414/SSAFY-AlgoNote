package com.ssafy.algonote.review.dto.request;

public record ReviewReq(
    int startLine,
    int endLine,
    String content
) { }