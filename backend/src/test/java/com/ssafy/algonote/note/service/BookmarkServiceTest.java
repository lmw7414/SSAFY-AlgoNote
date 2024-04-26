package com.ssafy.algonote.note.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Bookmark;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.dto.BookmarkStatusRes;
import com.ssafy.algonote.note.repository.BookmarkRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class BookmarkServiceTest {

    @InjectMocks
    BookmarkService bookmarkService;

    @Mock
    BookmarkRepository bookmarkRepository;

    @Mock
    NoteRepository noteRepository;

    @Mock
    MemberRepository memberRepository;

    @Nested
    @DisplayName("북마크 생성/삭제")
    class testBookmark {

        private Long noteId;
        private Long memberId;
        private Note note;
        private Member member;
        private Bookmark bookmark;

        @BeforeEach
        void setup() {
            noteId = 1L;
            memberId = 1L;
            note = getNote();
            member = getMember();
            bookmark = getBookmark();
        }

        @Test
        @DisplayName("[성공] 북마크가 없었던 경우 생성")
        void testDoBookmark_BookmarkDoesNotExist() {
            // given
            member = getMember();
            note = getNote();

            willReturn(Optional.of(member)).given(memberRepository).findById(any());
            willReturn(Optional.of(note)).given(noteRepository).findById(any());

            willReturn(Optional.empty()).given(bookmarkRepository).findByNoteIdAndMemberId(anyLong(), anyLong());

            // when
            BookmarkStatusRes result = bookmarkService.doBookmark(1L, 1L);

            // then
            verify(bookmarkRepository, times(1)).findByNoteIdAndMemberId(1L, 1L);
            verify(bookmarkRepository, times(1)).save(any());

            assertTrue(result.bookmarked());
        }

        @Test
        @DisplayName("[성공] 북마크가 있었던 경우 삭제")
        void testDoBookmark_BookmarkExists() {
            // given
            member = getMember();
            note = getNote();

            willReturn(Optional.of(member)).given(memberRepository).findById(any());
            willReturn(Optional.of(note)).given(noteRepository).findById(any());

            willReturn(Optional.of(bookmark)).given(bookmarkRepository).findByNoteIdAndMemberId(anyLong(), anyLong());

            // when
            BookmarkStatusRes result = bookmarkService.doBookmark(1L, 1L);

            // then
            verify(bookmarkRepository, times(1)).findByNoteIdAndMemberId(1L, 1L);
            verify(bookmarkRepository, times(1)).delete(any());

            // Asserting the result
            assertFalse(result.bookmarked());
        }

        @Test
        @DisplayName("[실패] 유효하지 않은 memberId")
        void fail_member() {
            // given
            willReturn(Optional.empty()).given(memberRepository).findById(any());

            //when
            CustomException exception = assertThrows(CustomException.class,
                () -> bookmarkService.doBookmark(memberId, noteId));

            //then
            assertEquals(ErrorCode.NOT_FOUND_MEMBER, exception.getErrorCode());
        }

        @Test
        @DisplayName("[실패] 유효하지 않은 noteId")
        void fail_note() {
            // given
            willReturn(Optional.of(member)).given(memberRepository).findById(any());
            willReturn(Optional.empty()).given(noteRepository).findById(any());

            //when
            CustomException exception = assertThrows(CustomException.class,
                () -> bookmarkService.doBookmark(memberId, noteId));

            //then
            assertEquals(ErrorCode.NOT_FOUND_NOTE, exception.getErrorCode());
        }

    }

    Note getNote() {
        return Note.builder()
            .id(1L)
            .build();
    }

    Member getMember() {
        return Member.builder()
            .id(1L)
            .build();
    }

    Bookmark getBookmark() {
        return Bookmark.builder()
            .id(1L)
            .build();
    }

}