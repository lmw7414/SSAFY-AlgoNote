package com.ssafy.algonote.problem.repository;

import com.ssafy.algonote.problem.domain.Problem;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TagRepositoryTest {
    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private TagRepository tagRepository;

    @Test
    @Transactional
    void test() {
        Long problemId = 1003L;
        Problem problem = problemRepository.findById(problemId).get();
        System.out.println("problem.getTitle() = " + problem.getTitle());
        problem.getTags().forEach(tag -> {
            System.out.println(tag.getNameEn());
            System.out.println("tag.getGroup() = " + tag.getGroup());
            System.out.println("-----");
        });
    }
}
