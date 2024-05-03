package com.ssafy.algonote.search.service;


import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.repository.NoteDocumentRepository;
import com.ssafy.algonote.problem.domain.ProblemDocument;
import com.ssafy.algonote.search.repository.SearchRepository;
import java.util.List;
import javax.swing.text.Document;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    public void fullTextSearch(String keyword, int page) {
        log.info("fullTextSearch keyword: {}, page: {}", keyword, page);
        List<NoteDocument> noteDocuments = searchRepository.searchNoteByNativeQuery(keyword, page);
        for (NoteDocument noteDocument : noteDocuments) {
            System.out.println("noteDocument.getNoteTitle() = " + noteDocument.getNoteTitle());
        }
        List<ProblemDocument> problemDocuments = searchRepository.searchByNativeQuery(keyword, page);

        for (ProblemDocument problemDocument : problemDocuments) {
            System.out.println("problemDocument.getTitle() = " + problemDocument.getTitle());
        }

    }

}
