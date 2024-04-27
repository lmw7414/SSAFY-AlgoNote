package com.ssafy.algonote.problem.controller;

import com.ssafy.algonote.problem.dto.ProblemResDto;
import com.ssafy.algonote.problem.service.ProblemService;
import com.ssafy.algonote.problem.service.TagService;
import lombok.RequiredArgsConstructor;
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
public class ProblemController {

    private final ProblemService problemService;
    private final TagService tagService;

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

}
