package com.ssafy.algonote.search.repository;

import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.problem.domain.ProblemDocument;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
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
public class SearchRepository {

    private final ElasticsearchOperations operations;

    public List<NoteDocument> searchNoteByNativeQuery(String keyword, int page) {
        Query query = createConditionNoteNativeQuery(keyword, page);

        SearchHits<NoteDocument> search = operations.search(query, NoteDocument.class);

        return search.stream().map(SearchHit::getContent).toList();
    }

    private Query createConditionNoteNativeQuery(String keyword, int page) {
        NativeQueryBuilder query = new NativeQueryBuilder();

        if(keyword == null)
            return new NativeQuery(query);

        if (keyword != null) {
            query.withQuery(q->q.match(
                    v->v.query(keyword).field("noteTitle")
                )
            );
        }

        query.withPageable(PageRequest.of(page,20));
        return query.build();
    }

    public List<ProblemDocument> searchByNativeQuery(String keyword, int page) {
        Query query = createConditionNativeQuery(keyword, page);

        SearchHits<ProblemDocument> search = operations.search(query, ProblemDocument.class);

        return search.stream().map(SearchHit::getContent).toList();
    }


    private Query createConditionNativeQuery(String keyword, int page) {
        NativeQueryBuilder query = new NativeQueryBuilder();

        if(keyword == null)
            return new NativeQuery(query);

            if (keyword != null) {
                query.withQuery(q->q.match(
                        v->v.query(keyword).field("title")
                    )
                );
            }

            if (keyword != null) {
                query.withQuery(q->q.match(
                        v->v.query(keyword).field("id")
                    )
                );
            }


            if (keyword != null) {
                query.withQuery(q -> q.nested(
                    nested -> nested.path("tags").query(
                        q2 -> q2.match(
                            v -> v.query(keyword).field("tags.tag")
                        )
                    )
                ));
            }

        query.withPageable(PageRequest.of(page, 20));


        return query.build();
    }
}
