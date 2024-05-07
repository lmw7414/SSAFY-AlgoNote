package com.ssafy.algonote.recommend.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import com.ssafy.algonote.recommend.dto.RecommendResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecommendService {

    private final SolvedProblemRepository solvedProblemRepository;
    private final MemberRepository memberRepository;

    public RecommendResDto recommendProblem(Long memberId, String tag) {
        // SolvedProblemService에 같은 기능을 하고 있는게 있는데 그걸 공통으로 빼서 사용하고 싶습니다.
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(
            ErrorCode.NOT_FOUND_MEMBER));



        return null;
    }
}
