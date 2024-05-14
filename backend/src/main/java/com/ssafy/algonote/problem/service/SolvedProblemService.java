package com.ssafy.algonote.problem.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.notification.domain.NotificationType;
import com.ssafy.algonote.notification.dto.request.NotificationReqDto;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.domain.WritingStatus;
import com.ssafy.algonote.problem.dto.response.AnalysisResDto;
import com.ssafy.algonote.problem.dto.response.AnaylsisDto;
import com.ssafy.algonote.problem.dto.response.NotedProblemResDto;
import com.ssafy.algonote.problem.dto.response.NotedProblemResDto.NotedProblemResDtoBuilder;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SolvedProblemService {

    private final ApplicationEventPublisher eventPublisher;

    private final SolvedProblemRepository solvedProblemRepository;
    private final MemberRepository memberRepository;
    private final NoteRepository noteRepository;

    // 제출이력에서 정답일 때 Solved Problem 등록
    public void saveSolvedProblem(Member member, Problem problem, LocalDateTime uploadedAt) {
        solvedProblemRepository.findByMemberAndProblem(member, problem).ifPresentOrElse(
                it -> {  // 존재한다면
                    it.setUploadedAt(uploadedAt);  //최근에 푼 날짜 수정
                    solvedProblemRepository.save(it);
                },
                () -> solvedProblemRepository.save(SolvedProblem.of(member, problem, uploadedAt))
        );
    }

    @Transactional(readOnly = true)
    public NotedProblemResDto getNotedProblem(Long memberId) {
        Member member = getMemberOrException(memberId);
        List<SolvedProblem> solvedProblems = solvedProblemRepository.findAllByMember(member);
        NotedProblemResDtoBuilder builder = NotedProblemResDto.builder()
                .solvedProblemCnt(solvedProblems.size());

        List<SolvedProblem> notedSolvedProblems = solvedProblems
                .stream()
                .filter(solvedProblem -> solvedProblem.getComplete().equals(WritingStatus.DONE))
                .toList();

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

    //TODO : 스케줄러 적용
    public void sendNotificationsToAllMembersAboutTag() {
        List<Member> members = memberRepository.findAll();
        for (Member member : members) {
            List<AnaylsisDto> groups = solvedProblemRepository.analyzeSolvedProblem(member.getId()).groups();
            for (AnaylsisDto group : groups) {
                log.info(group.lastSolvedDate() + " 로그 확인");
                if (Math.abs(ChronoUnit.DAYS.between(group.lastSolvedDate(), LocalDate.now())) == 15) {
                    eventPublisher.publishEvent(
                        new NotificationReqDto(
                            NotificationType.TAG,
                            member,
                            null,
                            null,
                            group.group(),
                            group + " 태그를 문제를 풀이한지 15일이 경과하였습니다!"));
                }
            }
        }
    }

}
