package com.ssafy.algonote.note.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.domain.NoteDocument;
import com.ssafy.algonote.note.dto.response.NoteSearchDto;
import com.ssafy.algonote.note.repository.BookmarkRepository;
import com.ssafy.algonote.note.repository.HeartRepository;
import com.ssafy.algonote.note.repository.NoteDocumentRepository;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.ProblemDocument;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.repository.ProblemDocumentRepository;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;
    private final SolvedProblemRepository solvedProblemRepository;
    private final HeartRepository heartRepository;
    private final BookmarkRepository bookmarkRepository;
    private final NoteDocumentRepository noteDocumentRepository;
    private final ProblemDocumentRepository problemDocumentRepository;

    private final ElasticsearchOperations operations;
    // 노트 생성
    public void saveNote(Long memberId, Long problemId, String title, String content) {
        Member member = getMemberOrException(memberId);
        SolvedProblem problem = getSolvedProblemOrException(memberId, problemId);

        Note note = noteRepository.save(Note.of(member, problem.getProblem(), title.trim(), content));
        noteDocumentRepository.save(
            NoteDocument.of(note.getId(), member, problem.getProblem(), title.trim(), content)
        );
    }

    // 노트 삭제
    public void deleteNote(Long memberId, Long noteId) {
        Member member = getMemberOrException(memberId);
        Note note = getNoteOrException(noteId);
        NoteDocument noteDocument = getNoteDocumentOrException(noteId);

        if (note.getMember() != member) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }
        bookmarkRepository.deleteAllByNote(note);
        heartRepository.deleteAllByNote(note);
        noteRepository.delete(note);
        noteDocumentRepository.delete(noteDocument);
    }

    // 문제별로 노트 조회
    @Transactional(readOnly = true)
    public Note getNoteById(Long noteId) {
        return getNoteOrException(noteId);
    }

    // 사용자별로 노트 조회 & 내가 작성한 노트 조회
    @Transactional(readOnly = true)
    public List<Note> getNotesByMember(Long memberId) {
        Member member = getMemberOrException(memberId);
        return noteRepository.findByMember(member);
    }

    // 노트 수정
    @Transactional
    public Note update(Long memberId, Long noteId, String title, String content) {
        Member member = getMemberOrException(memberId);
        Note note = getNoteOrException(noteId);
        NoteDocument noteDocument = getNoteDocumentOrException(noteId);


        if (note.getMember() != member) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        if (title != null) {
            note.setTitle(title);
            noteDocument.setNoteTitle(title);
        }

        if (content != null) {
            note.setContent(content);
            noteDocument.setContent(content);
        }
        noteDocumentRepository.save(noteDocument);
        return noteRepository.saveAndFlush(note);
    }

    private Note getNoteOrException(Long noteId) {
        return noteRepository.findById(noteId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NOTE));
    }

    private NoteDocument getNoteDocumentOrException(Long noteId) {
        return noteDocumentRepository.findById(noteId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NOTE));
    }


    private Member getMemberOrException(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

    private SolvedProblem getSolvedProblemOrException(Long memberId, Long problemId) {
        return solvedProblemRepository.findByMember_IdAndProblem_Id(memberId, problemId)
                .orElseThrow(() -> new CustomException((ErrorCode.NOT_SOLVED)));
    }



    public List<NoteSearchDto> fulltextNoteSearch(String keyword, int page) {

        SearchHits<NoteDocument> noteHits = searchNoteDocument(keyword, page);
        return parseSearchHits(noteHits);
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
            .subCriteria(new Criteria("problemTitle").matches(keyword))
            .subCriteria(new Criteria("memberNickname").matches(keyword));

        CriteriaQuery query = new CriteriaQuery(noteCriteria);

        query.setPageable(PageRequest.of(page, 10));


        return operations.search(query, NoteDocument.class);
    }

    @Transactional
    public List<NoteSearchDto> parseSearchHits(SearchHits<NoteDocument> noteHits) {
        List<NoteSearchDto> noteSearchResults = new ArrayList<>();

        for(SearchHit<NoteDocument> hit : noteHits){
            NoteDocument noteDocument = hit.getContent();
            ProblemDocument problemDocument = problemDocumentRepository.findById(
                noteDocument.getProblemId()).orElse(null);
            int tier = problemDocument.getTier();

            noteSearchResults.add(NoteSearchDto.of(
                noteDocument,
                tier
            ));
        }

        return noteSearchResults;

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
}
