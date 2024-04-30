package com.ssafy.algonote.submission.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.algonote.submission.dto.SubmissionDto;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SubmissionResDto(
        Long submissionId,
        String code,
        String result,
        Integer length,
        LocalDateTime submissionTime,
        Long memorySize,
        Integer runningTime,
        String language
) {
    public static SubmissionResDto fromDto(SubmissionDto dto) {
        return new SubmissionResDto(
                dto.submissionId(),
                dto.code(),
                dto.result(),
                dto.length(),
                dto.submissionTime(),
                dto.memorySize(),
                dto.runningTime(),
                dto.language()
        );
    }
}
