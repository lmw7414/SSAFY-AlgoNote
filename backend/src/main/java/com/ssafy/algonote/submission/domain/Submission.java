package com.ssafy.algonote.submission.domain;

import com.ssafy.algonote.common.BaseEntity;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.submission.dto.SubmissionDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Submission extends BaseEntity {

    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    private String code;
    private String result;
    private Integer length;
    private LocalDateTime submissionTime;
    private Long memorySize;
    private Integer runningTime;
    private String language;

    public static Submission of(SubmissionDto dto) {
        return Submission.builder()
                .id(dto.submissionId())
                .problem(dto.problem())
                .member(dto.member())
                .code(dto.code())
                .result(dto.result())
                .length(dto.length())
                .submissionTime(dto.submissionTime())
                .memorySize(dto.memorySize())
                .runningTime(dto.runningTime())
                .language(dto.language())
                .build();
    }

}
