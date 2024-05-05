package com.ssafy.algonote.note.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.dto.HeartResDto;
import com.ssafy.algonote.note.dto.request.NoteSaveReqDto;
import com.ssafy.algonote.note.dto.request.NoteUpdateReqDto;
import com.ssafy.algonote.note.dto.response.NoteGroupByProblemResDto;
import com.ssafy.algonote.note.dto.response.NoteResDto;
import com.ssafy.algonote.note.dto.response.NoteWithoutContentResDto;
import com.ssafy.algonote.note.service.HeartService;
import com.ssafy.algonote.note.service.NoteService;
import com.ssafy.algonote.problem.dto.response.ProblemWithNoteResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public ResponseEntity<Void> saveNote(@RequestBody NoteSaveReqDto req) {
        Long memberId = SecurityUtil.getMemberId();
        noteService.saveNote(memberId, req.problemId(), req.title(), req.content());
        return ResponseEntity.ok().build();
    }

    //노트 수정
    @PatchMapping("/{noteId}")
    public ResponseEntity<NoteResDto> updateNote(@PathVariable("noteId") Long noteId, @RequestBody NoteUpdateReqDto req) {
        log.info("노트 수정 api 요청");
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
    public ResponseEntity<Void> deleteNote(@PathVariable("noteId") Long noteId) {
        Long memberId = SecurityUtil.getMemberId();
        noteService.deleteNote(memberId, noteId);
        return ResponseEntity.ok().build();
    }

    // 노트 상세 조회
    @GetMapping("/{noteId}")
    public ResponseEntity<NoteResDto> getNote(@PathVariable("noteId") Long noteId) {
        Long memberId = SecurityUtil.getMemberId();
        Note result = noteService.getNoteById(noteId);
        return ResponseEntity.ok(NoteResDto.from(
                        noteService.getNoteById(noteId),
                        heartService.heartCnt(result.getId()),
                        heartService.heartStatus(memberId, result.getId())
                )
        );
    }

    // 사용자가 작성한 노트 조회
    @GetMapping
    public ResponseEntity<ProblemWithNoteResDto> searchNotesByMember(@RequestParam("memberId") Long requestMemberId) {
        Long memberId = SecurityUtil.getMemberId();
        List<Note> myNotes = noteService.getNotesByMember(requestMemberId);

        Map<Long, List<Note>> groupedNotesByProblemId = myNotes
                .stream()
                .collect(Collectors.groupingBy(
                                note -> note.getProblem().getId()
                        )
                );

        return ResponseEntity.ok(ProblemWithNoteResDto.from(groupedNotesByProblemId
                        .values()
                        .stream()
                        .map(notes -> {
                                    List<NoteWithoutContentResDto> noteWithoutContentResDtos = notes.stream()
                                            .map(it ->
                                                    NoteWithoutContentResDto.from(
                                                            it,
                                                            heartService.heartCnt(it.getId()),
                                                            heartService.heartStatus(memberId, it.getId())
                                                    )
                                            ).toList();
                                    return NoteGroupByProblemResDto.from(
                                            notes.get(0).getProblem(),
                                            noteWithoutContentResDtos
                                    );
                                }
                        )
                        .toList()
                )
        );
    }

}
