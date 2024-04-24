package com.ssafy.algonote.member.repository;

import com.ssafy.algonote.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
