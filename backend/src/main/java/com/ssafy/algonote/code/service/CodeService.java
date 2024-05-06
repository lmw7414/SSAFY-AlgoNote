package com.ssafy.algonote.code.service;

import com.ssafy.algonote.code.dto.request.AnalyzeReqDto;
import com.ssafy.algonote.code.dto.response.AnalyzeResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class CodeService {

    private final RestTemplate restTemplate;

    @Value("${analyze.server.url}")
    private String serverUrl;

    public AnalyzeResDto analyzeCode(AnalyzeReqDto dto) {

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<AnalyzeReqDto> requestEntity = new HttpEntity<>(dto, headers);
        return restTemplate.postForObject(serverUrl, requestEntity, AnalyzeResDto.class);
    }
}

