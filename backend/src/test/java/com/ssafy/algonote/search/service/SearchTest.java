package com.ssafy.algonote.search.service;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.repository.NoteDocumentRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.Problem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SearchTest {
    @Autowired
    private NoteDocumentRepository noteDocumentRepository;

    @Autowired
    private NoteRepository noteRepository;
    @Test
    public void createTest() {
        Member member = Member.builder().id(1L).build();

        Problem problem = Problem.builder().id(1002L).build();

        Note note = noteRepository.save(Note.of(member, problem, "title", "content"));
        noteDocumentRepository.save(NoteDocument.of(note.getId(), member, problem,"title", "content"));

    }

    @Test
    public void deleteTest() {
        noteDocumentRepository.deleteById(4L);
    }

    @Test
    public void updateTest() {
        NoteDocument noteDocument = noteDocumentRepository.findById(5L).get();

        noteDocument.setContent("update content");
        noteDocumentRepository.save(noteDocument);
    }
}
