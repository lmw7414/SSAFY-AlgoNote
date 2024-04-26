package com.ssafy.algonote.review.service;

import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.review.domain.Review;
import com.ssafy.algonote.review.dto.request.ReviewReqDto;
import com.ssafy.algonote.review.dto.request.ReviewUpdateReqDto;
import com.ssafy.algonote.review.dto.response.ReviewResDto;
import com.ssafy.algonote.review.repository.ReviewRepository;
import java.util.List;
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

    public void create(ReviewReqDto req, Long memberId, Long noteId) {
        Member member = getOrElseThrow(memberId);
        Note note = getNoteOrElseThrow(noteId);

        if (!(req.startLine() <= req.endLine())) {
            throw new CustomException(ErrorCode.INVALID_LINE_RANGE);
        }

        Review review = Review.of(req, member, note);
        reviewRepository.save(review);
    }

    private Note getNoteOrElseThrow(Long noteId) {
        return noteRepository.findById(noteId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NOTE));
    }

    @Transactional(readOnly = true)
    public List<ReviewResDto> readList(Long noteId) {
        getNoteOrElseThrow(noteId);

        List<Review> reviews = reviewRepository.findAllByNoteId(noteId);
        return reviews.stream().map(ReviewResDto::from).toList();
    }

    public void update(ReviewUpdateReqDto req, Long memberId, Long noteId, Long reviewId) {
        Member member = getOrElseThrow(memberId);
        Review review = getReviewOrElseThrow(reviewId);

        if (!review.getNote().getId().equals(noteId)) {
            throw new CustomException(ErrorCode.INVALID_PATH);
        }

        if (!review.getMember().getId().equals(member.getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        review.update(req);
    }

    private Review getReviewOrElseThrow(Long reviewId) {
        return reviewRepository.findById(reviewId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REVIEW));
    }

    public void delete(Long memberId, Long noteId, Long reviewId) {
        Member member = getOrElseThrow(memberId);
        Review review = getReviewOrElseThrow(reviewId);

        if (!review.getNote().getId().equals(noteId)) {
            throw new CustomException(ErrorCode.INVALID_PATH);
        }

        if (!review.getMember().getId().equals(member.getId())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        reviewRepository.delete(review);
    }

    private Member getOrElseThrow(Long memberId) {
        return memberRepository.findById(memberId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MEMBER));
    }

}
