package com.ssafy.algonote.recommend.dto;


import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.algonote.problem.domain.Tag;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


public record RecommendProblemResDto(
    Long problemId,
    int tier,
    String problemTitle) {
}