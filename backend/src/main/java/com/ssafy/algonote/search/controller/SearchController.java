package com.ssafy.algonote.search.controller;

import com.ssafy.algonote.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/full-text")
    public void fullTextSearch(@RequestParam("keyword") String keyword,
        @RequestParam("page") int page) {
        searchService.fullTextSearch(keyword, page);
    }
}
