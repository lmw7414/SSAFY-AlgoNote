package com.ssafy.algonote.submission.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.submission.dto.request.SubmissionReqDto;
import com.ssafy.algonote.submission.dto.response.SubmissionResDto;
import com.ssafy.algonote.submission.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<Void> saveSubmission(@RequestBody SubmissionReqDto dto) {
        Long memberId = SecurityUtil.getMemberId();
        submissionService.saveSubmission(
                dto.submissionId(),
                memberId,
                dto.problemId(),
                dto.code(),
                dto.result(),
                dto.length(),
                dto.submissionTime(),
                dto.memorySize(),
                dto.runningTime(),
                dto.language()

        );
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<SubmissionResDto>> searchSubmissions(@RequestParam("memberId") Long memberId, @RequestParam("problemId") Long problemId) {
        return ResponseEntity.ok(submissionService.searchSubmissions(memberId, problemId)
                .stream()
                .map(SubmissionResDto::fromDto)
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/{submissionId}")
    public ResponseEntity<SubmissionResDto> searchSubmission(@PathVariable("submissionId") Long submissionId) {
        return ResponseEntity.ok(
                SubmissionResDto.fromDto(submissionService.searchSubmissionById(submissionId))
        );
    }

}
