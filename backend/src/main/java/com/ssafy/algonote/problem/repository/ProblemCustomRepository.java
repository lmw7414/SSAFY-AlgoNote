package com.ssafy.algonote.problem.repository;

import com.ssafy.algonote.problem.domain.Problem;
import com.ssafy.algonote.recommend.dto.RecommendProblemResDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProblemCustomRepository {

    Page<RecommendProblemResDto> findProblemsByTag(Long memberId, String tag, Pageable pageable);
}
