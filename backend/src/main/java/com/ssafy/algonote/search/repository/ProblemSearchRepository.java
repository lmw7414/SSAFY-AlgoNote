package com.ssafy.algonote.search.repository;

import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.problem.domain.ProblemDocument;
import com.ssafy.algonote.search.dto.request.SearchConditionReqDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
@RequiredArgsConstructor
public class ProblemSearchRepository {

    private final ElasticsearchOperations operations;

    public List<NoteDocument> searchNoteByNativeQuery(SearchConditionReqDto searchConditionReqDto) {
        Query query = createNoteConditionNativeQuery(searchConditionReqDto);

        SearchHits<NoteDocument> search = operations.search(query, NoteDocument.class);
    }

    public List<ProblemDocument> searchProblemByNativeQuery(SearchConditionReqDto searchConditionReqDto) {
        Query query = createProblemConditionNativeQuery(searchConditionReqDto);

        SearchHits<ProblemDocument> search = operations.search(query, ProblemDocument.class);
//        log.info("search result : {}", search.getTotalHits());
        return search.stream().map(SearchHit::getContent).toList();
    }

    private Query createNoteConditionNativeQuery(SearchConditionReqDto searchConditionReqDto) {
        
    }

    private Query createProblemConditionNativeQuery(SearchConditionReqDto searchConditionReqDto) {
        NativeQueryBuilder query = NativeQuery.builder();

        if(searchConditionReqDto == null)
            return new NativeQuery(query);

        if (searchConditionReqDto.problemId() != null) {
            query.withQuery(q->q.match(
                    v->v.query(searchConditionReqDto.problemId()).field("id")
                )
            );
        }

        if (searchConditionReqDto.title() != null) {
            query.withQuery(q->q.match(
                    v->v.query(searchConditionReqDto.title()).field("title")
                )
            );
        }

        if (searchConditionReqDto.tag() != null) {
            query.withQuery(q -> q.nested(
                nested -> nested.path("tags").query(
                    q2 -> q2.match(
                        v -> v.query(searchConditionReqDto.tag()).field("tags.tag")
                    )
                )
            ));
        }

        return new NativeQuery(query);
    }
}
