package com.ssafy.algonote.fixture;

import com.ssafy.algonote.submission.domain.Submission;

import java.time.LocalDateTime;

import static com.ssafy.algonote.fixture.MemberFixture.createMember;
import static com.ssafy.algonote.fixture.ProblemFixture.createProblem;

public class SubmissionFixture {

    public static Submission createSuccess(Long submissionId, Long memberId) {
        return new Submission(
                submissionId,
                createProblem(),
                createMember(memberId),
                "right code",
                "맞았습니다!!",
                403,
                LocalDateTime.now(),
                311332L,
                1776,
                "Java 11"
        );
    }

    public static Submission createFail(Long submissionId, Long memberId) {
        return new Submission(
                submissionId,
                createProblem(),
                createMember(memberId),
                "wrong code",
                "틀렸습니다",
                0,
                LocalDateTime.now(),
                0L,
                0,
                "Java 11"
        );
    }
}
