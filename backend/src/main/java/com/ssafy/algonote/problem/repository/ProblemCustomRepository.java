package com.ssafy.algonote.problem.repository;

import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.recommend.dto.response.RecommendProblemResDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProblemCustomRepository {


    List<Long> findSolvedProblemIdByTag(Long memberId, String tag);

    Page<RecommendProblemResDto> findByIds(List<Long> ids, Pageable pageable);
}
