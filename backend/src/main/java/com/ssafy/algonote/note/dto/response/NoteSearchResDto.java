package com.ssafy.algonote.note.dto.response;

import lombok.Builder;

@Builder
public record NoteSearchResDto(
    Long noteId,
    Long problemId,
    String noteTitle,
    String problemTitle,
    int problemTier,
    String memberNickname,
    long heartCnt,
    boolean bookmarked,
    boolean hearted
) {

    public static NoteSearchResDto of(NoteSearchDto tempDto, long heartCnt, boolean bookmarked, boolean hearted) {
        return NoteSearchResDto.builder()
            .noteId(tempDto.noteId())
            .problemId(tempDto.problemId())
            .problemTier(tempDto.problemTier())
            .noteTitle(tempDto.noteTitle())
            .problemTitle(tempDto.problemTitle())
            .memberNickname(tempDto.memberNickname())
            .hearted(hearted)
            .heartCnt(heartCnt)
            .bookmarked(bookmarked)
            .build();
    }
}
