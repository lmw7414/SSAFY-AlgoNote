package com.ssafy.algonote.note.repository;

import com.ssafy.algonote.note.domain.Bookmark;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByNoteIdAndMemberId(Long noteId, Long memberId);

}
