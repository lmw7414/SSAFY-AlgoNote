package com.ssafy.algonote.problem.repository;

import com.ssafy.algonote.problem.domain.ProblemDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ProblemDocumentRepository extends ElasticsearchRepository<ProblemDocument, Long> {

}
