package com.ssafy.algonote.note.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.repository.BookmarkRepository;
import com.ssafy.algonote.note.repository.HeartRepository;
import com.ssafy.algonote.note.repository.NoteDocumentRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;
    private final SolvedProblemRepository solvedProblemRepository;
    private final HeartRepository heartRepository;
    private final BookmarkRepository bookmarkRepository;
    private final NoteDocumentRepository noteDocumentRepository;
    // 노트 생성
    public void saveNote(Long memberId, Long problemId, String title, String content) {
        Member member = getMemberOrException(memberId);
        SolvedProblem problem = getSolvedProblemOrException(memberId, problemId);

        Note note = noteRepository.save(Note.of(member, problem.getProblem(), title.trim(), content));
        noteDocumentRepository.save(
            NoteDocument.of(note.getId(), member, problem.getProblem(), title.trim(), content)
        );
    }

    // 노트 삭제
    public void deleteNote(Long memberId, Long noteId) {
        Member member = getMemberOrException(memberId);
        Note note = getNoteOrException(noteId);
        NoteDocument noteDocument = getNoteDocumentOrException(noteId);

        if (note.getMember() != member) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }
        bookmarkRepository.deleteAllByNote(note);
        heartRepository.deleteAllByNote(note);
        noteRepository.delete(note);
        noteDocumentRepository.delete(noteDocument);
    }

    // 문제별로 노트 조회
    @Transactional(readOnly = true)
    public Note getNoteById(Long noteId) {
        return getNoteOrException(noteId);
    }

    // 사용자별로 노트 조회 & 내가 작성한 노트 조회
    @Transactional(readOnly = true)
    public List<Note> getNotesByMember(Long memberId) {
        Member member = getMemberOrException(memberId);
        return noteRepository.findByMember(member);
    }

    // 노트 수정
    @Transactional
    public Note update(Long memberId, Long noteId, String title, String content) {
        Member member = getMemberOrException(memberId);
        Note note = getNoteOrException(noteId);
        NoteDocument noteDocument = getNoteDocumentOrException(noteId);


        if (note.getMember() != member) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        if (title != null) {
            note.setTitle(title);
            noteDocument.setNoteTitle(title);
        }

        if (content != null) {
            note.setContent(content);
            noteDocument.setContent(content);
        }
        noteDocumentRepository.save(noteDocument);
        return noteRepository.saveAndFlush(note);
    }

    private Note getNoteOrException(Long noteId) {
        return noteRepository.findById(noteId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NOTE));
    }

    private NoteDocument getNoteDocumentOrException(Long noteId) {
        return noteDocumentRepository.findById(noteId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NOTE));
    }


    private Member getMemberOrException(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

    private SolvedProblem getSolvedProblemOrException(Long memberId, Long problemId) {
        return solvedProblemRepository.findByMember_IdAndProblem_Id(memberId, problemId)
                .orElseThrow(() -> new CustomException((ErrorCode.NOT_SOLVED)));
    }

}
