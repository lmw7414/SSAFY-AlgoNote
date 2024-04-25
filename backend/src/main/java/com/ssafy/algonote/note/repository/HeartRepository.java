package com.ssafy.algonote.note.repository;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.note.domain.Heart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeartRepository extends JpaRepository<Heart, Long> {
    boolean existsByMemberIdAndNoteId(Long memberId, Long noteId);
    Heart findOneByMemberIdAndNoteId(Long memberId, Long noteId);
}
