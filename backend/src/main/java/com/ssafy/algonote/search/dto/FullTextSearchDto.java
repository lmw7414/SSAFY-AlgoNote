package com.ssafy.algonote.search.dto;


import lombok.Builder;
import lombok.ToString;

@Builder
public record FullTextSearchDto(
    String index,
    Long id,
    String title
) {
}
