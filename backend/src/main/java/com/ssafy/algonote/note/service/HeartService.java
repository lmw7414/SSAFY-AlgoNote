package com.ssafy.algonote.note.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Heart;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.repository.HeartRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
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

    public void heart(Long memberId, Long noteId) {
        log.info("userId: {}, noteId: {}", memberId, noteId);

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(
            ErrorCode.NOT_FOUND_MEMBER));

        Heart heart = heartRepository.findOneByMemberIdAndNoteId(memberId, noteId);

        if (heart == null) {
            Member member = Member.builder()
                                  .id(memberId)
                                  .build();

            Note note = Note.builder()
                            .id(noteId)
                            .build();

            heart = Heart.builder()
                         .member(member)
                         .note(note)
                         .build();

            heartRepository.save(heart);

        }else{
            heartRepository.delete(heart);
        }

    }
}
