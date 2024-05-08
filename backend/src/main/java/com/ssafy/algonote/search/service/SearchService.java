package com.ssafy.algonote.search.service;


import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.NestedQuery;

import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.service.BookmarkService;
import com.ssafy.algonote.note.service.HeartService;
import com.ssafy.algonote.problem.domain.ProblemDocument;
import com.ssafy.algonote.search.dto.response.NoteSearchResDto;
import com.ssafy.algonote.search.dto.response.ProblemSearchResDto;
import com.ssafy.algonote.search.dto.response.SearchResDto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
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
    private final BookmarkService bookmarkService;
    private final HeartService heartService;

    public SearchResDto fullTextSearch(Long memberId, String keyword, int page) {
        SearchHits<ProblemDocument> problemHits = searchProblemDocument(keyword, page);
        SearchHits<NoteDocument> noteHits = searchNoteDocument(keyword, page);
        return parseSearchHits(memberId, problemHits, noteHits);
    }

    private SearchHits<NoteDocument> searchNoteDocument(String keyword, int page) {

//        MatchQuery problemIdMatch = MatchQuery.of(m -> m.field("problemId").query(keyword));
//        MatchQuery problemTitleMatch = MatchQuery.of(m -> m.field("problemTitle").query(keyword));
//        MatchQuery noteTitleMatch = MatchQuery.of(m -> m.field("noteTitle").query(keyword));
//
//        Query query = createQuery(Arrays.asList(problemIdMatch._toQuery(), problemTitleMatch._toQuery(), noteTitleMatch._toQuery()));

        Criteria noteCriteria = new Criteria().or()
                .subCriteria(new Criteria("problemId").matches(keyword))
                .subCriteria(new Criteria("noteTitle").matches(keyword))
                .subCriteria(new Criteria("problemTitle").matches(keyword));

        CriteriaQuery query = new CriteriaQuery(noteCriteria);

        query.setPageable(PageRequest.of(page, 10));


        return operations.search(query, NoteDocument.class);
    }


    private SearchHits<ProblemDocument> searchProblemDocument(String keyword, int page){
        MatchQuery idMatch = MatchQuery.of(m -> m.field("id").query(keyword));
        MatchQuery titleMatch = MatchQuery.of(m -> m.field("title").query(keyword));
        NestedQuery tagMatch = NestedQuery.of(n->n.path("tags").query(q->q.match(m->m.field("tags.tag").query(keyword))));
        Query query = createQuery(Arrays.asList(idMatch._toQuery(), titleMatch._toQuery(), tagMatch._toQuery()));
        query.setPageable(PageRequest.of(page, 10));

        return operations.search(query, ProblemDocument.class);
    }

    private Query createQuery(List<co.elastic.clients.elasticsearch._types.query_dsl.Query> queries){
        return new NativeQueryBuilder()
                .withQuery(
                        q -> q.bool(
                                b -> b.should(
                                        queries
                                )))
                .build();

    }

    private SearchResDto parseSearchHits(Long memberId, SearchHits<ProblemDocument> problemHits, SearchHits<NoteDocument> noteHits) {
        List<NoteSearchResDto> noteSearchResults = new ArrayList<>();
        List<ProblemSearchResDto> problemSearchResults = new ArrayList<>();

        for(SearchHit<ProblemDocument> hit : problemHits){
            ProblemDocument problemDocument = hit.getContent();

            problemSearchResults.add(ProblemSearchResDto.from(problemDocument));
        }

        for(SearchHit<NoteDocument> hit : noteHits){
            NoteDocument noteDocument = hit.getContent();

            noteSearchResults.add(NoteSearchResDto.of(noteDocument,
                heartService.heartCnt(noteDocument.getId()),
                heartService.heartStatus(memberId, noteDocument.getId()),
                bookmarkService.bookmarkStatus(memberId, noteDocument.getId())
            ));
        }

        return SearchResDto.from(noteSearchResults, problemSearchResults);

    }

}
