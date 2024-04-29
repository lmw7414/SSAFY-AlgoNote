package com.ssafy.algonote.note.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Heart;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.dto.HeartResDto;
import com.ssafy.algonote.note.repository.HeartRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final MemberRepository memberRepository;
    private final NoteRepository noteRepository;

    @Transactional
    public HeartResDto heart(Long memberId, Long noteId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_MEMBER)
        );

        Note note = noteRepository.findById(noteId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_NOTE)
        );

        Heart heart = heartRepository.findOneByMemberIdAndNoteId(memberId, noteId);

        if (heart == null) {
            log.info("ADD HEART userId: {}, noteId: {}", memberId, noteId);
            member = Member.builder()
                    .id(memberId)
                    .build();

            note = Note.builder()
                    .id(noteId)
                    .build();

            heart = Heart.builder()
                    .member(member)
                    .note(note)
                    .build();

            heartRepository.save(heart);
            return new HeartResDto(true);
        } else {
            log.info("DELETE HEART userId: {}, noteId: {}", memberId, noteId);
            heartRepository.delete(heart);
            return new HeartResDto(false);
        }
    }

    // 좋아요 개수 카운트
    public long heartCnt(Long noteId) {
        Note note = getNoteOrException(noteId);
        return heartRepository.countByNote(note);
    }

    // 좋아요 여부 확인
    public boolean heartStatus(Long memberId, Long noteId) {
        Note note = getNoteOrException(noteId);
        Member member = getMemberOrException(memberId);
        return heartRepository.existsByMemberAndNote(member, note);
    }

    private Note getNoteOrException(Long noteId) {
        return noteRepository.findById(noteId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NOTE));
    }

    private Member getMemberOrException(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }
}
