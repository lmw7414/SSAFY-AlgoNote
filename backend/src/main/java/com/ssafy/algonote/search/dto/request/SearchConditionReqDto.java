package com.ssafy.algonote.search.dto.request;

import lombok.Builder;

@Builder
public record SearchConditionReqDto(
    String title,
    Long problemId,
    String tag
) {


}
