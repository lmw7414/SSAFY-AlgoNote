package com.ssafy.algonote.note.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.problem.domain.Problem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class NoteDocumentRepositoryTest {

    @Autowired
    private NoteDocumentRepository noteDocumentRepository;

    @Test
    void test() {
        Member member = Member.builder()
            .id(1L)
            .nickname("polya")
            .build();

        Problem problem = Problem.builder()
            .id(1033L)
            .title("칵테일")
            .build();

        NoteDocument noteDocument = NoteDocument.of(member,problem,"test","test");
        noteDocumentRepository.save(noteDocument);
    }
}