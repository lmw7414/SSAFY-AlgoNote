package com.ssafy.algonote.recommend.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import com.ssafy.algonote.recommend.dto.RecommendProblemResDto;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecommendService {

    private final SolvedProblemRepository solvedProblemRepository;
    private final MemberRepository memberRepository;
    private final ProblemRepository problemRepository;


    public Page<RecommendProblemResDto> recommendProblem(Long memberId, String tag, Pageable pageable) {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(
            ErrorCode.NOT_FOUND_MEMBER));

        return problemRepository.findProblemsByTag(memberId, tag, pageable);
    }
}
