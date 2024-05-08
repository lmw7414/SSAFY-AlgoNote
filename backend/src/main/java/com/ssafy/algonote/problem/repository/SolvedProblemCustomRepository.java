package com.ssafy.algonote.problem.repository;

import com.ssafy.algonote.problem.dto.SolvedProblemDto;
import java.util.List;

public interface SolvedProblemCustomRepository {
    List<SolvedProblemDto> analyzeSolvedProblem(Long memberId);
}
