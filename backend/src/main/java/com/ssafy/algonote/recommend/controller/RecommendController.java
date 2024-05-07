package com.ssafy.algonote.recommend.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.recommend.dto.RecommendResDto;
import com.ssafy.algonote.recommend.service.RecommendService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class RecommendController {

    private final RecommendService recommendService;

    @Operation(
        summary = "문제 추천",
        description = "tag에 해당하는 문제 중 사용자가 풀지 않은 문제를 추천한다"
    )
    @GetMapping("/{tag}")
    public ResponseEntity<RecommendResDto> recommendProblem(@PathVariable("tag") String tag) {
        Long memberId = SecurityUtil.getMemberId();
        log.info("memberId: {}, tag: {}", memberId, tag);

        return ResponseEntity.ok(recommendService.recommendProblem(memberId, tag));
    }
}
