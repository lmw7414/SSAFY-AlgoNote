package com.ssafy.algonote.problem.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.dto.SolvedProblemDto;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SolvedProblemCustomRepositoryImplTest {
    @Autowired
    private SolvedProblemRepository solvedProblemRepository;

    @Test

    void test() {
        Long memberId = 1L;
        List<SolvedProblemDto> solvedProblemDtos = solvedProblemRepository.analyzeSolvedProblem(memberId);
        Member member = Member.builder().id(1L).build();
        Problem problem = Problem.builder().id(1000L).build();
        SolvedProblem solvedProblem = SolvedProblem.of(member, problem, LocalDateTime.now());
//        solvedProblemRepository.save(solvedProblem);

        assertThat(solvedProblemDtos.size()).isEqualTo(3);
//        solvedProblemDtos.forEach(problemDto->{
//            System.out.println("problemDto.getTitle() = " + problemDto.getProblemTitle());
//            System.out.println("problemDto.getId() = " + problemDto.getProblemId());
//            System.out.println("problemDto.getTags() = " + problemDto.getTags());
//            System.out.println("problemDto.getGroups() = " + problemDto.getGroups());
//            System.out.println("problemDto.getUploadedAt() = " + problemDto.getUploadedAt());
//            System.out.println("------");
//        });
    }
}