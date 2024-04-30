package com.ssafy.algonote.note.service;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.domain.MemberRole;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.note.repository.NoteRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class HeartServiceTest {

    @Autowired
    HeartService heartService;

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ProblemRepository problemRepository;


    @Test
    @DisplayName("좋아요")
    @Transactional
    void heartTest() {
        Member member = Member.builder()
                .email("wlskaka6@gmail.com")
                .password("2312")
                .nickname("kimheesu3")
                .profileImg("")
                .role(MemberRole.USER).build();
        memberRepository.save(member);

        Problem problem = Problem.builder()
                .id(1L)
                .title("title")
                .tier(1)
                .build();

        problemRepository.save(problem);

        Note note = Note.builder()
                .problem(problem)
                .member(member)
                .title("title")
                .content("content")
                .build();

        noteRepository.save(note);

        heartService.heart(member.getId(), note.getId());
        heartService.heart(member.getId(), note.getId());
    }
}