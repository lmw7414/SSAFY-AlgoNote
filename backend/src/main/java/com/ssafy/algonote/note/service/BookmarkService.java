package com.ssafy.algonote.note.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Bookmark;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.dto.BookmarkRes;
import com.ssafy.algonote.note.dto.BookmarkStatusRes;
import com.ssafy.algonote.note.repository.BookmarkRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final MemberRepository memberRepository;
    private final NoteRepository noteRepository;

    public BookmarkStatusRes doBookmark(Long memberId, Long noteId) {
        Member member = getMemberOrElseThrow(memberId);
        Note note = getNoteOrElseThrow(noteId);

        Optional<Bookmark> optionalBookmark = bookmarkRepository.findByNoteIdAndMemberId(noteId, memberId);
        if (optionalBookmark.isEmpty()) {
            bookmarkRepository.save(Bookmark.builder()
                .member(member)
                .note(note)
                .build());

            return new BookmarkStatusRes(true);
        } else {
            bookmarkRepository.delete(optionalBookmark.get());

            return new BookmarkStatusRes(false);
        }
    }

    private Member getMemberOrElseThrow(Long memberId) {
        return memberRepository.findById(memberId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

    private Note getNoteOrElseThrow(Long noteId) {
        return noteRepository.findById(noteId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NOTE));
    }

    @Transactional(readOnly = true)
    public List<BookmarkRes> getList(Long memberId) {
        getMemberOrElseThrow(memberId);
        return bookmarkRepository.findAllByMemberId(memberId)
            .stream()
            .map(BookmarkRes::from)
            .toList();
    }

}
