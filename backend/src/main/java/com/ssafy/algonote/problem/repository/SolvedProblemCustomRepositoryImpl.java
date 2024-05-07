package com.ssafy.algonote.problem.repository;


import static com.ssafy.algonote.problem.domain.QSolvedProblem.solvedProblem;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.algonote.problem.domain.QSolvedProblem;
import com.ssafy.algonote.problem.domain.SolvedProblem;
import com.ssafy.algonote.problem.dto.response.AnalysisResDto;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j

public class SolvedProblemCustomRepositoryImpl implements SolvedProblemCustomRepository{

    private JPAQueryFactory queryFactory;

    public SolvedProblemCustomRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

//    @Override
//    public AnalysisResDto analyzeSolvedProblem(Long memberId) {
//        return null;
//    }
}
