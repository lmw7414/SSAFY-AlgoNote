package com.ssafy.algonote.fixture;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.note.domain.Note;
import org.springframework.test.util.ReflectionTestUtils;

public class NoteFixture {
    public static Note createNote(Long noteId, Member member) {
        Note note = new Note();
        ReflectionTestUtils.setField(note, "id", noteId);
        ReflectionTestUtils.setField(note, "member", member);
        return note;
    }
}
