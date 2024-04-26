package com.ssafy.algonote.note.dto;

import com.ssafy.algonote.note.domain.Note;
import lombok.Builder;

@Builder
public record BookmarkNoteResDto(
    String title,
    int heartCnt
) {
    public static BookmarkNoteResDto from(Note note) {
        return BookmarkNoteResDto.builder()
            .title(note.getTitle())
            .heartCnt(note.getHearts().size())
            .build();
    }
}
