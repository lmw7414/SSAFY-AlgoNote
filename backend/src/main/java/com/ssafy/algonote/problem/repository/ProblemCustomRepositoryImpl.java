package com.ssafy.algonote.problem.repository;

import static com.ssafy.algonote.problem.domain.QProblem.problem;
import static com.ssafy.algonote.problem.domain.QSolvedProblem.solvedProblem;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.recommend.dto.response.RecommendProblemResDto;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@Slf4j
public class ProblemCustomRepositoryImpl implements ProblemCustomRepository {
    private final JPAQueryFactory queryFactory;

    public ProblemCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Long> findSolvedProblemIdByTag(Long memberId, String tag) {
        return queryFactory.select(solvedProblem.problem.id)
            .from(solvedProblem)
            .where(solvedProblem.member.id.eq(memberId))
            .join(solvedProblem.problem)
            .where(solvedProblem.problem.tags.any().nameEn.eq(tag))
            .fetch();
    }

    @Override
    public List<Problem> findSolvedProblemIdByGroup(Long memberId, String group) {
        List<Problem> problems =  queryFactory.select(solvedProblem.problem)
            .from(solvedProblem)
            .where(solvedProblem.member.id.eq(memberId))
            .join(solvedProblem.problem)
            .where(solvedProblem.problem.tags.any().group.eq(group))
            .fetch();



        return problems;
    }


    @Override
    public Page<RecommendProblemResDto> findByIds(List<Long> ids, Pageable pageable) {
        List<RecommendProblemResDto> results = queryFactory
            .select(Projections.constructor(RecommendProblemResDto.class,
                problem.id,
                problem.tier,
                problem.title,
                problem.acceptedUserCount,
                problem.averageTries
            ))
            .from(problem)
            .where(problem.id.in(ids))
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(problem.acceptedUserCount.desc())
            .fetch();

        long totalCount = queryFactory
            .select(problem.count())
            .from(problem)
            .where(problem.id.in(ids))
            .fetchOne();
        return new PageImpl<>(results, pageable, totalCount);
    }
}
