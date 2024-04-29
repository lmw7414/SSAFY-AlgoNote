package com.ssafy.algonote.problem.repository;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolvedProblemRepository extends JpaRepository<SolvedProblem, Long> {

    // 멤버로 푼 문제 조회
    Page<SolvedProblem> findAllByMember(Pageable pageable, Member member);
}
