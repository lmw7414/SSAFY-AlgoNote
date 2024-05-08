package com.ssafy.algonote.note.dto.response;

import com.ssafy.algonote.note.domain.NoteDocument;
import lombok.Builder;

@Builder
public record NoteSearchTempDto(
    Long noteId,
    Long problemId,
    String noteTitle,
    String problemTitle,
    int problemTier,
    String memberNickname
) {

    public static NoteSearchTempDto of(NoteDocument noteDocument, int tier) {
        return NoteSearchTempDto.builder()
            .noteId(noteDocument.getId())
            .problemId(Long.parseLong(noteDocument.getProblemId()))
            .problemTier(tier)
            .noteTitle(noteDocument.getNoteTitle())
            .problemTitle(noteDocument.getProblemTitle())
            .memberNickname(noteDocument.getMemberNickname())
            .build();
    }
}
