package com.ssafy.algonote.note.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;
    private final ProblemRepository problemRepository;
    // 노트 생성
    public void saveNote(Long memberId, Long problemId, String title, String content) {
        Member member = getMemberOrException(memberId);
        Problem problem = getProblemOrException(problemId);
        noteRepository.save(Note.of(member, problem, title.trim(), content));
    }
    // 노트 삭제
    public void deleteNote(Long memberId, Long noteId) {
        Member member = getMemberOrException(memberId);
        Note note = getNoteOrException(noteId);
        if(note.getMember() != member) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }
        //TODO: 좋아요 관련 삭제
        // TODO: 북마크 관련 삭제
        noteRepository.delete(note);
    }
    // 전체 노트 조회
    //public Page<Note> getNotes() {}

    // 문제별로 노트 조회
    //public Page<Note> getNotesByProblem() {}

    // 사용자별로 노트 조회
    //public Page<Note> getNotesByMember() {}

    // 내가 작성한 노트 조회


    // 노트 업데이트


    private Note getNoteOrException(Long noteId) {
        return noteRepository.findById(noteId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NOTE));
    }

    private Member getMemberOrException(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

    private Problem getProblemOrException(Long problemId) {
        return problemRepository.findById(problemId)
                .orElseThrow(() -> new CustomException((ErrorCode.NOT_FOUND_PROBLEM)));
    }

}
