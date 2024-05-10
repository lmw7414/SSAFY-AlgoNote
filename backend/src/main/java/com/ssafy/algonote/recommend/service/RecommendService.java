package com.ssafy.algonote.recommend.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.algonote.exception.CustomException;
import com.ssafy.algonote.exception.ErrorCode;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.member.repository.MemberRepository;
import com.ssafy.algonote.problem.repository.ProblemRepository;
import com.ssafy.algonote.problem.repository.SolvedProblemRepository;
import com.ssafy.algonote.recommend.dto.RecommendDto;
import com.ssafy.algonote.recommend.dto.response.RecommendProblemResDto;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecommendService {

    private final SolvedProblemRepository solvedProblemRepository;
    private final MemberRepository memberRepository;
    private final ProblemRepository problemRepository;


    @Value("${fastapi.url}")
    private String fastApiUrl;


    @Transactional
    public Page<RecommendProblemResDto> recommendProblem(Long memberId, String tag)  {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(
            ErrorCode.NOT_FOUND_MEMBER));

        String nickname = member.getNickname();

        List<Long> solvedProblemIds = problemRepository.findSolvedProblemIdByTag(memberId, tag);

        String url = fastApiUrl + "/python/recommend";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        RecommendDto recommendDto = RecommendDto.of(nickname, tag, solvedProblemIds);

        HttpEntity<RecommendDto> requestEntity = new HttpEntity<>(recommendDto, headers);
        RestTemplate restTemplate = new RestTemplate();


        String response = restTemplate.postForObject(url, requestEntity, String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        try{
            JsonNode node = objectMapper.readTree(response);
        }catch (IOException e){
            log.error("error: {}", e.getMessage());
            throw new CustomException(ErrorCode.JSON_MAPPING_ERROR);
        }




    }
}