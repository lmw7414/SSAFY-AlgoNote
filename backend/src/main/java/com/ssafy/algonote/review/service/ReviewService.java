package com.ssafy.algonote.review.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.review.domain.Review;
import com.ssafy.algonote.review.dto.request.ReviewReqDto;
import com.ssafy.algonote.review.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;

    public void create(ReviewReqDto req, Long noteId) {
        Long memberId = 1L;
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));  // TODO: 추후 accessToken 으로부터 조회하는 방식으로 변경
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));

        if (!(req.startLine() <= req.endLine())) {
            throw new CustomException(ErrorCode.INVALID_LINE_RANGE);
        }

        Review review = Review.of(req, member, note);
        reviewRepository.save(review);
    }

}
