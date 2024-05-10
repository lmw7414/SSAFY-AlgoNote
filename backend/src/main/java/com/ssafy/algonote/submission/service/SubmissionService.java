package com.ssafy.algonote.submission.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import com.ssafy.algonote.problem.service.SolvedProblemService;
import com.ssafy.algonote.submission.domain.Submission;
import com.ssafy.algonote.submission.dto.SubmissionDto;
import com.ssafy.algonote.submission.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final MemberRepository memberRepository;
    private final ProblemRepository problemRepository;
    private final SolvedProblemService solvedProblemService;
    // 제출 이력 저장
    public void saveSubmission(Long submissionId,
                               Long memberId,
                               Long problemId,
                               String code,
                               String result,
                               Integer length,
                               LocalDateTime submissionTime,
                               Long memorySize,
                               Integer runningTime,
                               String language) {

        Member member = getMemberOrException(memberId);
        Problem problem = getProblemOrException(problemId);

        if(result.equals("맞았습니다!!")) {
            solvedProblemService.saveSolvedProblem(memberId, problemId, submissionTime);
        }
        submissionRepository.save(Submission.of(
                new SubmissionDto(
                        submissionId,
                        problem,
                        member,
                        code,
                        result,
                        length,
                        submissionTime,
                        memorySize,
                        runningTime,
                        language
                ))
        );

    }

    // 제출 이력 조회(문제, 멤버로)
    public List<SubmissionDto> searchSubmissions(Long memberId, Long problemId) {
        Member member = getMemberOrException(memberId);
        Problem problem = getProblemOrException(problemId);

        return submissionRepository.findAllByMemberAndProblem(member, problem).stream()
                .map(SubmissionDto::fromEntity)
                .sorted(Comparator.comparing(SubmissionDto::submissionId).reversed())
                .collect(Collectors.toList());
    }

    // 제출 이력 단건 조회
    public SubmissionDto searchSubmissionById(Long submissionId) {
        return SubmissionDto.fromEntity(getSubmissionOrException(submissionId));
    }

    private Submission getSubmissionOrException(Long submissionId) {
        return submissionRepository.findById(submissionId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_SUBMISSION));
    }

    private Member getMemberOrException(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

    private Problem getProblemOrException(Long problemId) {
        return problemRepository.findById(problemId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PROBLEM));
    }

}
