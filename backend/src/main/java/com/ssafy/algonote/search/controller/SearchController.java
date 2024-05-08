package com.ssafy.algonote.search.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.search.dto.response.SearchResDto;
import com.ssafy.algonote.search.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Search API", description = "검색 관련 API")
public class SearchController {

    private final SearchService searchService;

    @Operation(summary = "키워드로 검색하기")
    @GetMapping("/full-text")
    public ResponseEntity<SearchResDto> fullTextSearch(@RequestParam("keyword") String keyword,
                                                     @RequestParam(value = "page", required = true) int page) {
        Long memberId = SecurityUtil.getMemberId();
        log.info("fullTextSearch keyword: {}, page: {}", keyword, page);

        return ResponseEntity.ok(searchService.fullTextSearch(memberId, keyword, page));
    }

}
