package com.ssafy.algonote.review.controller;

import com.ssafy.algonote.review.dto.request.ReviewReq;
import com.ssafy.algonote.review.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class ReviewController {

    private ReviewService reviewService;

    @PostMapping("/notes/{noteId}/reviews")
    public void create(@PathVariable Long noteId, @RequestBody ReviewReq req) {
        reviewService.create(req, noteId);
    }

}
