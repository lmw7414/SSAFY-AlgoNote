package com.ssafy.algonote.search.service;


import com.ssafy.algonote.note.repository.NoteDocumentRepository;
import com.ssafy.algonote.search.dto.FullTextSearchDto;
import com.ssafy.algonote.search.repository.ProblemSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final ProblemSearchRepository problemSearchRepository;
    private final NoteDocumentRepository noteDocumentRepository;

}
