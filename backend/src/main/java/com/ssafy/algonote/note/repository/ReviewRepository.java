package com.ssafy.algonote.note.repository;


import com.ssafy.algonote.note.domain.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByNoteId(Long noteId);

}
