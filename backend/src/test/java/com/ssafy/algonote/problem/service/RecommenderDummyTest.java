package com.ssafy.algonote.problem.service;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import com.ssafy.algonote.problem.repository.TagRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

@SpringBootTest
public class RecommenderDummyTest {
    @Autowired
    private SolvedProblemRepository solvedProblemRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private TagRepository tagRepository;

    private List<Problem> extractRandom(List<Problem> problems, int numberOfElement){
        Collections.shuffle(problems);

        List<Problem> result = new ArrayList<>();

        for(int i = 0; i < numberOfElement; i++){
            result.add(problems.get(i));
        }

        return result;
    }

    private  int getIntersectionCount(List<Problem> setA, Set<Problem> setB) {
        // setA의 사본을 생성하여 원본 데이터 보존
        Set<Problem> copyOfSetA = new HashSet<>(setA);

        // copyOfSetA를 setB의 요소만 유지하도록 조정
        copyOfSetA.retainAll(setB);

        // 변경된 copyOfSetA의 크기가 교집합의 크기
        return copyOfSetA.size();
    }

    @Test
    @Transactional
    @Rollback(false)
    void insertTest() {
        List<Problem> bfsProblems = new ArrayList<>(tagRepository.findByNameEn("bfs").get().getProblems());
//        System.out.println("bfsProblems.size() = " + bfsProblems.size());

//        List<Problem> problems1 = extractRandom(bfsProblems, 500);
//        List<Problem> problems2 = extractRandom(bfsProblems, 500);

        Long memberIds[] = {1L, 2L};

        for(Long memberId : memberIds){
            Member member = memberRepository.findById(memberId).get();
            List<Problem> problems = extractRandom(bfsProblems, 500);

            for(Problem problem: problems){
                SolvedProblem solvedProblem = SolvedProblem.builder()
                    .member(member)
                    .problem(problem)
                    .build();



                solvedProblemRepository.save(solvedProblem);
            }
        }
    }
}
