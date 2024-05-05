package com.ssafy.algonote.submission.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import com.ssafy.algonote.submission.domain.Submission;
import com.ssafy.algonote.submission.repository.SubmissionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.ssafy.algonote.fixture.SubmissionFixture.createSuccess;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class SubmissionServiceTest {

    @InjectMocks
    private SubmissionService sut;

    @Mock
    private SubmissionRepository submissionRepository;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private ProblemRepository problemRepository;

    @Test
    @DisplayName("[성공] 성공 제출이력 정상적으로 저장")
    void test1() {
        // Given
        Long submissionId = 100000L;
        Long problemId = 1000L;
        Long memberId = 1L;
        Submission submission = createSuccess(submissionId, memberId);

        given(memberRepository.findById(memberId)).willReturn(Optional.of(mock(Member.class)));
        given(problemRepository.findById(problemId)).willReturn(Optional.of(mock(Problem.class)));

        // When
        sut.saveSubmission(
                submission.getId(),
                memberId,
                problemId,
                submission.getCode(),
                submission.getResult(),
                submission.getLength(),
                submission.getSubmissionTime(),
                submission.getMemorySize(),
                submission.getRunningTime(),
                submission.getLanguage()
        );

        // Then
        verify(submissionRepository).save(any());
    }

    @Test
    @DisplayName("[실패] 멤버가 존재하지 않는 경우")
    void test2() {
        // Given
        Long submissionId = 100000L;
        Long problemId = 1000L;
        Long memberId = 1L;
        Submission submission = createSuccess(submissionId, memberId);

        given(memberRepository.findById(memberId)).willReturn(Optional.empty());

        // When & Then
        assertThrows(CustomException.class, () -> {
            sut.saveSubmission(
                    submission.getId(),
                    memberId,
                    problemId,
                    submission.getCode(),
                    submission.getResult(),
                    submission.getLength(),
                    submission.getSubmissionTime(),
                    submission.getMemorySize(),
                    submission.getRunningTime(),
                    submission.getLanguage()
            );
        });
    }

    @Test
    @DisplayName("[실패] 문제가 존재하지 않는 경우")
    void test3() {
        // Given
        Long submissionId = 100000L;
        Long problemId = 1000L;
        Long memberId = 1L;
        Submission submission = createSuccess(submissionId, memberId);

        given(memberRepository.findById(memberId)).willReturn(Optional.of(mock(Member.class)));
        given(problemRepository.findById(problemId)).willReturn(Optional.empty());
        // When & Then
        assertThrows(CustomException.class, () -> {
            sut.saveSubmission(
                    submission.getId(),
                    memberId,
                    problemId,
                    submission.getCode(),
                    submission.getResult(),
                    submission.getLength(),
                    submission.getSubmissionTime(),
                    submission.getMemorySize(),
                    submission.getRunningTime(),
                    submission.getLanguage()
            );
        });
    }

}