package com.ssafy.algonote.problem.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.domain.WritingStatus;
import com.ssafy.algonote.problem.dto.SolvedProblemDto;
import com.ssafy.algonote.problem.dto.response.AnalysisResDto;
import com.ssafy.algonote.problem.dto.response.NotedProblemResDto;
import com.ssafy.algonote.problem.dto.response.NotedProblemResDto.NotedProblemResDtoBuilder;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import java.util.List;
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
    private final NoteRepository noteRepository;

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

    @Transactional
    public NotedProblemResDto getNotedProblem(Long memberId) {
        List<SolvedProblem> solvedProblems = solvedProblemRepository.findAllByMemberId(memberId);
        NotedProblemResDtoBuilder builder = NotedProblemResDto.builder()
            .solvedProblemCnt(solvedProblems.size());

        List<SolvedProblem> notedSolvedProblems = solvedProblems.stream().filter(solvedProblem -> {
            return solvedProblem.getComplete().equals(WritingStatus.DONE);
        }).toList();

        builder.notedProblemCnt(notedSolvedProblems.size());

        int noteCnt = 0;
        for (SolvedProblem notedSolvedProblem : notedSolvedProblems) {
            Long problemId = notedSolvedProblem.getProblem().getId();
            noteCnt += noteRepository.findByProblemId(problemId).size();
        }

        builder.noteCnt(noteCnt);
        return builder.build();

    }

    public Page<SolvedProblem> getSolvedProblemByMember(Pageable pageable, Long memberId) {
        Member member = getMemberOrException(memberId);
        return solvedProblemRepository.findAllByMember(pageable, member);
    }

    public AnalysisResDto getAnalysis(Long memberId) {
        return solvedProblemRepository.analyzeSolvedProblem(memberId);
    }


    private Member getMemberOrException(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

    private Problem getProblemOrException(Long problemId) {
        return problemRepository.findById(problemId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

    private SolvedProblem getSolvedProblemOrException(Long memberId, Long problemId) {
        return solvedProblemRepository.findByMember_IdAndProblem_Id(memberId, problemId)
                .orElseThrow(() -> new CustomException((ErrorCode.NOT_SOLVED)));
    }
}
