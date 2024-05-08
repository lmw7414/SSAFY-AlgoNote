package com.ssafy.algonote.problem.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.problem.dto.response.AnalysisResDto;
import com.ssafy.algonote.problem.dto.response.ProblemResDto;
import com.ssafy.algonote.problem.dto.response.SolvedProblemResDto;
import com.ssafy.algonote.problem.service.ProblemService;
import com.ssafy.algonote.problem.service.SolvedProblemService;
import com.ssafy.algonote.problem.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/problems")
@RequiredArgsConstructor
@Slf4j
public class ProblemController {

    private final ProblemService problemService;
    private final SolvedProblemService solvedProblemService;
    private final TagService tagService;

    @GetMapping("/solved")
    public ResponseEntity<Page<SolvedProblemResDto>> mySolvedProblem(@PageableDefault(size = 20, sort = "uploadedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Long memberId = SecurityUtil.getMemberId();
        return ResponseEntity.ok(
                solvedProblemService.getSolvedProblemByMember(pageable, memberId)
                        .map(SolvedProblemResDto::from)
        );
    }

    @GetMapping("/search-tag")
    public ResponseEntity<List<ProblemResDto>> findProblemsByTagName(@RequestParam("tag") String tagNameEn) {
        return ResponseEntity.ok(
                tagService.findProblemsByTagName(tagNameEn)
                        .stream()
                        .map(ProblemResDto::from)
                        .sorted(Comparator.comparingLong(ProblemResDto::id))
                        .toList()
        );
    }

    @GetMapping("/search-id")
    public ResponseEntity<ProblemResDto> findProblemsById(@RequestParam("id") Long id) {
        return ResponseEntity.ok(ProblemResDto.from(problemService.getProblemById(id)));
    }

    @GetMapping("/search-name")
    public ResponseEntity<ProblemResDto> findProblemsById(@RequestParam("name") String title) {
        return ResponseEntity.ok(ProblemResDto.from(problemService.getProblemByTitle(title)));
    }

    @GetMapping("/tags")
    public ResponseEntity<List<String>> findAllTags() {
        return ResponseEntity.of(Optional.ofNullable(tagService.getTagNames()));
    }


    @GetMapping("/analysis")
    public ResponseEntity<AnalysisResDto> analysis() {
        Long memberId = SecurityUtil.getMemberId();
        log.info("memberId: {}", memberId);

        return ResponseEntity.ok(solvedProblemService.getAnalysis(memberId));
    }


}
