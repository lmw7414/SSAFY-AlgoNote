package com.ssafy.algonote.search.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.ProblemDocument;

import com.ssafy.algonote.search.repository.SearchRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SearchServiceTest {

    @Autowired
    private SearchRepository searchRepository;

    @Autowired
    private SearchService searchService;

    @Autowired
    private NoteRepository noteRepository;

    @Test
    public void problemSearchTest(){

        List<ProblemDocument> problemDocuments = searchRepository.searchByNativeQuery("1022", 1);
        assertThat(problemDocuments.size()).isEqualTo(20);
    }

    @Test
    public void noteSearchTest(){
        List<NoteDocument> noteDocuments = searchRepository.searchNoteByNativeQuery("test",1);
        assertThat(noteDocuments.size()).isEqualTo(2);

    }

    @Test
    public void fullTextSearchTest(){
        searchService.fullTextSearch("1022", 1);
    }

}