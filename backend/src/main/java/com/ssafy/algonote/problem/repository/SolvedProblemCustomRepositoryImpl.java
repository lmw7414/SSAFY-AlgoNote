package com.ssafy.algonote.problem.repository;


import static com.ssafy.algonote.problem.domain.QSolvedProblem.solvedProblem;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.algonote.problem.dto.SolvedProblemDto;
import com.ssafy.algonote.problem.dto.response.AnalysisResDto;
import com.ssafy.algonote.problem.dto.response.AnaylsisDto;
import com.ssafy.algonote.problem.dto.response.AnaylsisDto.AnaylsisDtoBuilder;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;

@Slf4j

public class SolvedProblemCustomRepositoryImpl implements SolvedProblemCustomRepository{

    private JPAQueryFactory queryFactory;
    private Map<String, List<SolvedProblemDto>> map;
    private Map<String, Integer> scoreMap;
    private Map<String, Set<Long>> problemIdMap;

    private String groups[] = {"math_theory", "graph_theory", "data_structure", "optimization", "implementation"};

    public SolvedProblemCustomRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
        this.map = new HashMap<>();
        this.scoreMap = new HashMap<>();
        this.problemIdMap = new HashMap<>();
        for (String group : groups) {
            map.put(group, new ArrayList<>());
            problemIdMap.put(group, new HashSet<>());
            scoreMap.put(group, 0);
        }
    }

    @Override
    @Transactional
    public AnalysisResDto analyzeSolvedProblem(Long memberId) {

        List<SolvedProblemDto> solvedProblemDtos = queryFactory.selectFrom(solvedProblem)
            .where(solvedProblem.member.id.eq(memberId))
            .orderBy(solvedProblem.uploadedAt.desc())
            .fetch()
            .stream()
            .map(SolvedProblemDto::of).toList();


        for (SolvedProblemDto dto : solvedProblemDtos) {
            for (String group : dto.getGroups()) {

                if(!problemIdMap.get(group).contains(dto.getProblemId())){
                    problemIdMap.get(group).add(dto.getProblemId());
                    scoreMap.put(group, scoreMap.get(group) + dto.getTier());
                }

                if(map.containsKey(group)){
                    map.get(group).add(dto);
                }
            }
        }


        List<AnaylsisDto> groups = new ArrayList<>();
        for(String group : this.groups) {
            AnaylsisDtoBuilder group1 = AnaylsisDto.builder()
                .group(group);

            if(problemIdMap.containsKey(group))
                group1.problemCount(problemIdMap.get(group).size());
            if(scoreMap.containsKey(group))
                group1.score(scoreMap.get(group));
            if(map.containsKey(group) && !map.get(group).isEmpty())
                group1.lastSolvedDate(map.get(group).get(0).getUploadedAt());

            groups.add(group1.build());
        }

        return new AnalysisResDto(solvedProblemDtos.size(), groups);
    }


}
