package com.ssafy.algonote.review.controller;

import com.ssafy.algonote.review.dto.request.ReviewReqDto;
import com.ssafy.algonote.review.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class ReviewController {

    private ReviewService reviewService;

    @PostMapping("/notes/{noteId}/reviews")
    public ResponseEntity<Void> create(@PathVariable Long noteId, @RequestBody ReviewReqDto req) {
        reviewService.create(req, noteId);
        return ResponseEntity.ok().build();
    }

}
