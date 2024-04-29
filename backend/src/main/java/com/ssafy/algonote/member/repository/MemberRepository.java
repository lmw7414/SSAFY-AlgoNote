package com.ssafy.algonote.member.repository;

import com.ssafy.algonote.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);


    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
