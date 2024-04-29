package com.ssafy.algonote.note.dto.response;

import java.util.List;

public record NoteGroupByProblemResDto(
        int noteCount,
        Long problemId,
        int tier,
        List<NoteWithoutContentResDto> notes
) {
    public static NoteGroupByProblemResDto from(Long problemId, int tier, List<NoteWithoutContentResDto> notes) {
        return new NoteGroupByProblemResDto(notes.size(), problemId, tier, notes);
    }
}
