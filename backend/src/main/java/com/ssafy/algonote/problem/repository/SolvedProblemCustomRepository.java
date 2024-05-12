package com.ssafy.algonote.problem.repository;

import com.ssafy.algonote.problem.dto.response.AnalysisResDto;
import java.util.List;

public interface SolvedProblemCustomRepository {
   AnalysisResDto analyzeSolvedProblem(Long memberId);

}
