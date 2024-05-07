package com.ssafy.algonote.problem.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class SolvedProblemService {

    private final SolvedProblemRepository solvedProblemRepository;
    private final MemberRepository memberRepository;
    private final ProblemRepository problemRepository;

    //TODO: submission 등록(맞았습니다) 시점에 저장
    public void saveSolvedProblem(Long memberId, Long problemId, LocalDateTime uploadedAt) {
        Member member = getMemberOrException(memberId);
        Problem problem = getProblemOrException(problemId);
        solvedProblemRepository.findByMember_IdAndProblem_Id(memberId, problemId).ifPresentOrElse(
                it -> {
                    it.setUploadedAt(uploadedAt);
                    solvedProblemRepository.save(it);
                },
                () -> solvedProblemRepository.save(SolvedProblem.of(member, problem, uploadedAt))
        );
    }

    public Page<SolvedProblem> getSolvedProblemByMember(Pageable pageable, Long memberId) {
        Member member = getMemberOrException(memberId);
        return solvedProblemRepository.findAllByMember(pageable, member);
    }

    private Member getMemberOrException(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

    private Problem getProblemOrException(Long problemId) {
        return problemRepository.findById(problemId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PROBLEM));
    }

    private SolvedProblem getSolvedProblemOrException(Long memberId, Long problemId) {
        return solvedProblemRepository.findByMember_IdAndProblem_Id(memberId, problemId)
                .orElseThrow(() -> new CustomException((ErrorCode.NOT_SOLVED)));
    }
}
