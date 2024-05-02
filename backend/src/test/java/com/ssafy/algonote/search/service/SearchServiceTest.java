package com.ssafy.algonote.search.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.ProblemDocument;
import com.ssafy.algonote.search.dto.request.SearchConditionReqDto;
import com.ssafy.algonote.search.repository.ProblemSearchRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SearchServiceTest {

    @Autowired
    private ProblemSearchRepository problemSearchRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Test
    public void problemSearchTest(){
        SearchConditionReqDto dto = SearchConditionReqDto.builder()
            .tag("math")
            .build();

        List<ProblemDocument> problemDocuments = problemSearchRepository.searchProblemByNativeQuery(dto);
        assertThat(problemDocuments.size()).isEqualTo(10);
    }

    @Test
    public void noteSearchTest(){

    }

}