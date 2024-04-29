package com.ssafy.algonote.note.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.dto.HeartResDto;
import com.ssafy.algonote.note.dto.request.NoteSaveReqDto;
import com.ssafy.algonote.note.dto.request.NoteUpdateReqDto;
import com.ssafy.algonote.note.dto.response.NoteResDto;
import com.ssafy.algonote.note.service.HeartService;
import com.ssafy.algonote.note.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;
    private final HeartService heartService;

    @PostMapping("/{noteId}/hearts")
    public ResponseEntity<HeartResDto> heart(@PathVariable("noteId") Long noteId) {
        log.info("noteId: {}", noteId);

        Long memberId = SecurityUtil.getMemberId();
        return ResponseEntity.ok(heartService.heart(memberId, noteId));
    }

    //노트 저장
    @PostMapping
    public ResponseEntity<Void> saveNote(@RequestParam NoteSaveReqDto req) {
        Long memberId = SecurityUtil.getMemberId();
        noteService.saveNote(memberId, req.problemId(), req.title(), req.content());
        return ResponseEntity.ok().build();
    }

    //노트 수정
    @PatchMapping("/{noteId}")
    public ResponseEntity<NoteResDto> updateNote(@PathVariable Long noteId, @RequestParam NoteUpdateReqDto req) {
        Long memberId = SecurityUtil.getMemberId();
        Note updatedNote = noteService.update(memberId, noteId, req.title(), req.content());
        return ResponseEntity.ok(
                NoteResDto.from(
                        updatedNote,
                        heartService.heartCnt(noteId),
                        heartService.heartStatus(memberId, noteId)
                )
        );
    }

    // 노트 삭제
    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long noteId) {
        Long memberId = SecurityUtil.getMemberId();
        noteService.deleteNote(memberId, noteId);
        return ResponseEntity.ok().build();
    }

    // 사용자가 작성한 노트 조회
    @GetMapping
    public ResponseEntity<Page<NoteResDto>> searchNotesByMember(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam("memberId") Long requestMemberId
    ) {
        Long memberId = SecurityUtil.getMemberId();
        return ResponseEntity.ok(
                noteService.getNotesByMember(pageable, requestMemberId)
                        .map(it -> NoteResDto.from(
                                        it,
                                        heartService.heartCnt(it.getId()),
                                        heartService.heartStatus(memberId, it.getId())
                                )
                        )
        );
    }

}


/*
문제 수집
solved problem 관리
 */