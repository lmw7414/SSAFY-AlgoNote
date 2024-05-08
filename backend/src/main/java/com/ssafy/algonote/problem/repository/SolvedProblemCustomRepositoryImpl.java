package com.ssafy.algonote.problem.repository;


import static com.ssafy.algonote.problem.domain.QSolvedProblem.solvedProblem;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.algonote.problem.dto.SolvedProblemDto;
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
    public List<SolvedProblemDto> analyzeSolvedProblem(Long memberId) {
        List<SolvedProblemDto> solvedProblemDtos = queryFactory.selectFrom(solvedProblem)
            .where(solvedProblem.member.id.eq(memberId))
            .fetch()
            .stream()
            .map(SolvedProblemDto::of).toList();

        Set<Long> scoreSet = new HashSet<>();

        for (SolvedProblemDto dto : solvedProblemDtos) {
            for (String group : dto.getGroups()) {
//                if (!scoreSet.contains(dto.getProblemId())) {
//                    scoreSet.add(dto.getProblemId());
//                    scoreMap.put(group, scoreMap.get(group) + dto.getTier());
//
//                }

                if(!problemIdMap.get(group).contains(dto.getProblemId())){
                    problemIdMap.get(group).add(dto.getProblemId());
                    scoreMap.put(group, scoreMap.get(group) + dto.getTier());
                }

                if(map.containsKey(group)){
                    map.get(group).add(dto);
                }
            }
        }

//        for (String s : map.keySet()) {
//            System.out.println("group = " + s);
//            System.out.println("scoreMap = " + scoreMap.get(s));
//            map.get(s).forEach(dto->{
//
//                System.out.println("dto.getProblemId() = " + dto.getProblemId());
//                System.out.println("dto.getProblemTitle() = " + dto.getProblemTitle());
//                System.out.println("-----");
//            });
//        }








        return solvedProblemDtos;

    }
}
