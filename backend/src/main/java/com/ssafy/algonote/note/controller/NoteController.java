package com.ssafy.algonote.note.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.dto.HeartResDto;
import com.ssafy.algonote.note.dto.request.NoteSaveReqDto;
import com.ssafy.algonote.note.dto.request.NoteUpdateReqDto;
import com.ssafy.algonote.note.dto.response.*;
import com.ssafy.algonote.note.service.BookmarkService;
import com.ssafy.algonote.note.service.HeartService;
import com.ssafy.algonote.note.service.NoteService;
import com.ssafy.algonote.problem.dto.response.ProblemWithNoteResDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Tag(name = "Note API", description = "노트 관련 API")
@Slf4j
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;
    private final HeartService heartService;
    private final BookmarkService bookmarkService;

    @Operation(
            summary = "노트의 좋아요",
            description = "노트의 좋아요 상태를 관리한다."
    )
    @PostMapping("/{noteId}/hearts")
    public ResponseEntity<HeartResDto> heart(@PathVariable("noteId") Long noteId) {
        log.info("noteId: {}", noteId);

        Long memberId = SecurityUtil.getMemberId();
        return ResponseEntity.ok(heartService.heart(memberId, noteId));
    }

    @Operation(
            summary = "노트 저장",
            description = "노트를 저장한다. 노트 저장은 제출이력이 있는 문제에 관해서만 노트를 생성할 수 있다."
    )
    @PostMapping
    public ResponseEntity<Void> saveNote(@RequestBody NoteSaveReqDto req) {
        Long memberId = SecurityUtil.getMemberId();
        noteService.saveNote(memberId, req.problemId(), req.title(), req.content());
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "노트 수정",
            description = "노트를 수정한다."
    )
    @PatchMapping("/{noteId}")
    public ResponseEntity<NoteResDto> updateNote(@PathVariable("noteId") Long noteId, @RequestBody NoteUpdateReqDto req) {
        log.info("노트 수정 api 요청");
        Long memberId = SecurityUtil.getMemberId();
        Note updatedNote = noteService.update(memberId, noteId, req.title(), req.content());
        return ResponseEntity.ok(
                NoteResDto.from(
                        updatedNote,
                        heartService.heartCnt(noteId),
                        heartService.heartStatus(memberId, noteId),
                        bookmarkService.bookmarkStatus(memberId, noteId)
                )
        );
    }

    @Operation(
            summary = "노트 삭제",
            description = "노트를 삭제한다. 삭제 시 노트 뿐만 아니라 좋아요, 북마크, es의 노트Doc도 모두 삭제한다."
    )
    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable("noteId") Long noteId) {
        Long memberId = SecurityUtil.getMemberId();
        noteService.deleteNote(memberId, noteId);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "노트 상세 조회",
            description = "노트를 상세조회한다."
    )
    @GetMapping("/{noteId}")
    public ResponseEntity<NoteResDto> getNote(@PathVariable("noteId") Long noteId) {
        Long memberId = SecurityUtil.getMemberId();
        Note result = noteService.getNoteById(noteId);
        return ResponseEntity.ok(NoteResDto.from(
                        noteService.getNoteById(noteId),
                        heartService.heartCnt(result.getId()),
                        heartService.heartStatus(memberId, result.getId()),
                        bookmarkService.bookmarkStatus(memberId, noteId)
                )
        );
    }

    @Operation(
            summary = "사용자가 작성한 노트 조회",
            description = "노트 상세조회 이전 단계로 문제별로 그루핑하여 문제안의 노트들을 모두 전달한다."
    )
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

    @Operation(
            summary = "노트 검색 - 엘라스틱서치",
            description = "엘라스틱서치를 통해 노트를 조회한다."
    )
    @GetMapping("/full-text")
    public ResponseEntity<SearchResDto> fullTextSearch(@RequestParam("keyword") String keyword,
                                                       @RequestParam(value = "page", required = true) int page) {
        Long memberId = SecurityUtil.getMemberId();
        log.info("fullTextSearch keyword: {}, page: {}", keyword, page);

        List<NoteSearchDto> noteSearchResults = noteService.fulltextNoteSearch(keyword, page);
        List<NoteSearchResDto> resDtos = noteSearchResults.stream().map(result -> {
            return NoteSearchResDto.of(result,
                    heartService.heartCnt(result.noteId()),
                    heartService.heartStatus(memberId, result.noteId()),
                    bookmarkService.bookmarkStatus(memberId, result.noteId()));
        }).toList();


        return ResponseEntity.ok(SearchResDto.from(resDtos));
    }

}
