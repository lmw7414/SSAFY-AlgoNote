package com.ssafy.algonote.note.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.repository.BookmarkRepository;
import com.ssafy.algonote.note.repository.HeartRepository;
import com.ssafy.algonote.note.repository.NoteDocumentRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static com.ssafy.algonote.fixture.MemberFixture.createMember;
import static com.ssafy.algonote.fixture.NoteFixture.createNote;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NoteServiceTest {

    @InjectMocks
    private NoteService sut;
    @Mock
    private NoteRepository noteRepository;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private HeartRepository heartRepository;
    @Mock
    private BookmarkRepository bookmarkRepository;
    @Mock
    private SolvedProblemRepository solvedProblemRepository;

    @Mock
    private NoteDocumentRepository noteDocumentRepository;

    // 노트 생성
    @Test
    @DisplayName("[생성] 노트 작성이 성공한 경우")
    void givenNoteData_whenSaveNote_thenNothing() {
        //given
        String title = "title";
        String content = "content";
        Long memberId = 1L;
        Long problemId = 1000L;

        Problem mockProblem = mock(Problem.class);
        SolvedProblem mockSolvedProblem = mock(SolvedProblem.class);

        when(mockProblem.getId()).thenReturn(problemId);
        when(mockSolvedProblem.getProblem()).thenReturn(mockProblem);

        //mocking
        given(memberRepository.findById(memberId)).willReturn(Optional.of(mock(Member.class)));
        given(solvedProblemRepository.findByMember_IdAndProblem_Id(memberId, problemId)).willReturn(Optional.of(mockSolvedProblem));
        given(noteRepository.save(any())).willReturn(mock(Note.class));
        given(noteDocumentRepository.save(any())).willReturn(mock(NoteDocument.class));

        //when
        sut.saveNote(memberId, problemId, title, content);

        //then
        verify(noteRepository).save(any());
        verify(noteDocumentRepository).save(any());
    }

    @Test
    @DisplayName("[생성] 노트 작성 시 요청한 유저가 존재하지 않는 경우")
    void givenNoteDataWithoutMember_whenSaveNote_thenThrowException() {
        // given
        String title = "title";
        String content = "content";
        Long memberId = 1L;
        Long problemId = 1000L;

        given(memberRepository.findById(memberId)).willReturn(Optional.empty());

        //when & then
        assertThrows(CustomException.class, () -> {
            sut.saveNote(memberId, problemId, title, content);
        });
    }

    @Test
    @DisplayName("[생성] 노트 작성 시 풀지 않은 문제를 등록한 경우")
    void givenNoteAndMemberInfo_whenSaveNoteWithNonExistProblem_thenThrowException() {
        // given
        String title = "title";
        String content = "content";
        Long memberId = 1L;
        Long problemId = 1000L;

        given(memberRepository.findById(memberId)).willReturn(Optional.of(mock(Member.class)));
        given(solvedProblemRepository.findByMember_IdAndProblem_Id(memberId, problemId)).willReturn(Optional.empty());

        // when & then
        assertThrows(CustomException.class, () -> {
            sut.saveNote(memberId, problemId, title, content);
        });
    }

    // 노트 삭제
    @Test
    @DisplayName("[삭제] 내가 작성한 노트 삭제")
    void givenUserId_whenDeleteNote_thenNothing() {
        Long memberId = 1L;
        Long noteId = 1000L;
        Member member = createMember(memberId);
        Note note = createNote(noteId, member);
        NoteDocument noteDocument = createNoteDoc(noteId);
        // mocking
        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
        given(noteRepository.findById(noteId)).willReturn(Optional.of(note));
        given(noteDocumentRepository.findById(noteId)).willReturn(Optional.of(noteDocument));

        sut.deleteNote(memberId, noteId);
        verify(noteRepository).delete(any());
    }

    @Test
    @DisplayName("[삭제] 노트 삭제 시 권한이 없는 경우")
    void givenMemberAndNote_whenDeleteNoteWithoutAuthority_thenThrowException() {
        // given
        Long memberId = 1L;
        Long noteId = 1000L;

        Member writer = createMember(memberId);
        Member other = createMember(2L);
        Note note = createNote(noteId, other);

        given(memberRepository.findById(memberId)).willReturn(Optional.of(writer));
        given(noteRepository.findById(noteId)).willReturn(Optional.of(note));

        // when & then
        assertThrows(CustomException.class, () -> {
            sut.deleteNote(memberId, noteId);
        });
    }

    @Test
    @DisplayName("[삭제] 노트 삭제 시 노트가 존재하지 않는 경우")
    void givenMemberAndNote_whenDeleteNoteWithoutNote_thenThrowException() {
        // given
        Long memberId = 1L;
        Long noteId = 1000L;

        Member member = createMember(memberId);

        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
        given(noteRepository.findById(noteId)).willReturn(Optional.empty());

        // when & then
        assertThrows(CustomException.class, () -> {
            sut.deleteNote(memberId, noteId);
        });
    }


    // 노트 업데이트
    @Test
    @DisplayName("[수정] 노트 수정이 성공하는 경우")
    void givenTitleAndContent_whenUpdateNote_thenNothing() {
        // given
        Long memberId = 1L;
        Long noteId = 1000L;
        String title = "updatedTitle";
        String content = "updatedContent";

        Member member = createMember(memberId);
        Note note = createNote(noteId, member);
        NoteDocument noteDocument = createNoteDoc(noteId);

        // mocking
        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
        given(noteRepository.findById(noteId)).willReturn(Optional.of(note));
        given(noteDocumentRepository.findById(noteId)).willReturn(Optional.of(noteDocument));

        // when
        sut.update(memberId, noteId, title, content);

        //then
        verify(noteDocumentRepository).save(any());
        verify(noteRepository).saveAndFlush(any());
    }

    private NoteDocument createNoteDoc(Long noteId) {
        NoteDocument noteDocument = new NoteDocument();
        ReflectionTestUtils.setField(noteDocument, "id", noteId);
        return noteDocument;
    }

}
