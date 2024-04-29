package com.ssafy.algonote.note.dto;

import com.ssafy.algonote.note.domain.Bookmark;
import lombok.Builder;

@Builder
public record BookmarkResDto(
    BookmarkNoteResDto note,
    BookmarkProblemResDto problem,
    BookmarkMemberResDto member
) {
    public static BookmarkResDto from(Bookmark bookmark) {
        return BookmarkResDto.builder()
            .note(BookmarkNoteResDto.from(bookmark.getNote()))
            .problem(BookmarkProblemResDto.from(bookmark.getNote().getProblem()))
            .member(BookmarkMemberResDto.from(bookmark.getMember()))
            .build();
    }
}
