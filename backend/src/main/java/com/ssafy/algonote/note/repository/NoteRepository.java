package com.ssafy.algonote.note.repository;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.problem.domain.Problem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    // 문제별 노트 조회
    Page<Note> findByProblem(Pageable pageable, Problem problem);

    // 멤버가 작성한 노트 조회
    Page<Note> findByMember(Pageable pageable, Member member);
}
