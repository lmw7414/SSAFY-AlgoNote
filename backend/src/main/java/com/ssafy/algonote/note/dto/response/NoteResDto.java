package com.ssafy.algonote.note.dto.response;

import com.ssafy.algonote.member.dto.response.MemberResDto;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.problem.dto.response.ProblemResDto;

import java.time.LocalDateTime;

public record NoteResDto(
        Long noteId,
        MemberResDto member,
        ProblemResDto problem,
        String noteTitle,
        String content,
        long heartCnt,
        boolean hearted,
        boolean bookmarked,
        LocalDateTime createdAt,
        LocalDateTime modifiedAt
) {
    public static NoteResDto from(Note note, long heartCnt, boolean hearted, boolean bookmarked) {
        return new NoteResDto(
                note.getId(),
                MemberResDto.from(note.getMember()),
                ProblemResDto.from(note.getProblem()),
                note.getTitle(),
                note.getContent(),
                heartCnt,
                hearted,
                bookmarked,
                note.getCreatedAt(),
                note.getModifiedAt()
        );
    }
}
