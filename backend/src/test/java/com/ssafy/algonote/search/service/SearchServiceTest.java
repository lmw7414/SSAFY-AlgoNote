package com.ssafy.algonote.search.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.repository.NoteDocumentRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.note.service.NoteService;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.domain.ProblemDocument;

import com.ssafy.algonote.problem.repository.ProblemRepository;
import com.ssafy.algonote.search.dto.response.SearchResDto;
import com.ssafy.algonote.search.repository.SearchRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SearchServiceTest {

    @Autowired
    private SearchService searchService;

    @Autowired
    private NoteDocumentRepository noteDocumentRepository;
    @Autowired
    private NoteService noteService;

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private MemberRepository memberRepository;


//    @Test
//    public void fullTextSearchTest(){
//        Long memberId = 1L;
//        Long problemId = 10470L;
//
//        Member member = memberRepository.findById(memberId).get();
//        Problem problem = problemRepository.findById(problemId).get();
//
//        NoteDocument noteDocument = NoteDocument.of(member, problem, "test", "content");
//
//        noteDocumentRepository.save(noteDocument);
//
//        SearchResDto title1 = searchService.fullTextSearch("다리", 0);
//
//        System.out.println("title1 = " + title1);
//    }


}