package com.ssafy.algonote.review.repository;


import com.ssafy.algonote.review.domain.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByNoteId(Long noteId);

}
