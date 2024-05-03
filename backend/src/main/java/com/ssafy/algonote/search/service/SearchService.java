package com.ssafy.algonote.search.service;


import co.elastic.clients.elasticsearch.core.SearchRequest;
import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.repository.NoteDocumentRepository;
import com.ssafy.algonote.problem.domain.ProblemDocument;
import com.ssafy.algonote.search.dto.response.NoteSearchResDto;
import com.ssafy.algonote.search.dto.response.ProblemSearchResDto;
import com.ssafy.algonote.search.dto.response.SearchResDto;
import com.ssafy.algonote.search.repository.SearchRepository;
import java.util.ArrayList;
import java.util.List;

import javax.swing.text.Document;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.client.RestClient;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final ElasticsearchOperations operations;

    public SearchResDto fullTextSearch(String keyword, int page) {
        Criteria problemCriteria = new Criteria().or()
            .subCriteria(new Criteria("id").matches(keyword))
            .subCriteria(new Criteria("title").matches(keyword))
            .subCriteria(new Criteria("tags.tag").matches(keyword));

        Criteria noteCriteria = new Criteria().or()
            .subCriteria(new Criteria("problemId").matches(keyword))
            .subCriteria(new Criteria("noteTitle").matches(keyword))
            .subCriteria(new Criteria("problemTitle").matches(keyword));

        Criteria finalCriteria = new Criteria().or()
            .subCriteria(problemCriteria)
            .subCriteria(noteCriteria);

        Query searchQuery = new CriteriaQuery(finalCriteria).setPageable(PageRequest.of(page, 20));

        SearchHits<ProblemDocument> problemHits = operations.search(searchQuery, ProblemDocument.class);
        SearchHits<NoteDocument> noteHits = operations.search(searchQuery, NoteDocument.class);

        return parseSearchHits(problemHits, noteHits);
    }

    private SearchResDto parseSearchHits(SearchHits<ProblemDocument> problemHits, SearchHits<NoteDocument> noteHits) {
        List<NoteSearchResDto> noteSearchResults = new ArrayList<>();
        List<ProblemSearchResDto> problemSearchResults = new ArrayList<>();

        for(SearchHit<ProblemDocument> hit : problemHits){
            ProblemDocument problemDocument = hit.getContent();

            problemSearchResults.add(ProblemSearchResDto.from(problemDocument));
        }

        for(SearchHit<NoteDocument> hit : noteHits){
            NoteDocument noteDocument = hit.getContent();

            noteSearchResults.add(NoteSearchResDto.from(noteDocument));
        }

        return SearchResDto.from(noteSearchResults, problemSearchResults);

    }

}
