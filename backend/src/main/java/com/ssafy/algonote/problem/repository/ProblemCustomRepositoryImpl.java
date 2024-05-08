package com.ssafy.algonote.problem.repository;

import static com.ssafy.algonote.problem.domain.QProblem.problem;
import static com.ssafy.algonote.problem.domain.QSolvedProblem.solvedProblem;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.problem.domain.QProblem;
import com.ssafy.algonote.problem.domain.QSolvedProblem;
import com.ssafy.algonote.recommend.dto.RecommendProblemResDto;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

@Slf4j
public class ProblemCustomRepositoryImpl implements ProblemCustomRepository {
    private final JPAQueryFactory queryFactory;

    public ProblemCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public Page<RecommendProblemResDto> findProblemsByTag(Long memberId, String tag, Pageable pageable) {
        log.info("memberId: {}, tag: {}, page: {}, size:{}", memberId, tag, pageable.getPageNumber(), pageable.getPageSize());

        List<RecommendProblemResDto> results = queryFactory
            .select(Projections.constructor(RecommendProblemResDto.class,
                problem.id,
                problem.tier,
                problem.title
            ))
            .from(problem)
            .where(
                problem.notIn(
                JPAExpressions.select(solvedProblem.problem)
                    .from(solvedProblem)
                    .where(solvedProblem.member.id.eq(memberId)))
                .and(problem.tier.gt(0))
                    .and(problem.tags.any().nameEn.eq(tag))
            )
            .offset(pageable.getOffset())
            .orderBy(problem.tier.asc())
            .limit(pageable.getPageSize())
            .fetch();

        long totalCount = queryFactory
            .select(problem.count())
            .from(problem)
            .where(problem.notIn(
                JPAExpressions.select(solvedProblem.problem)
                    .from(solvedProblem)
                    .where(solvedProblem.member.id.eq(memberId))
            )).fetchOne();
        log.info("totalCount: {}", totalCount);
        return new PageImpl<>(results, pageable, totalCount);
    }
}
