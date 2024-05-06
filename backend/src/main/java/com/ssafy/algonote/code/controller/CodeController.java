package com.ssafy.algonote.code.controller;

import com.ssafy.algonote.code.dto.request.AnalyzeReqDto;
import com.ssafy.algonote.code.dto.request.ComplexityReqDto;
import com.ssafy.algonote.code.dto.response.AnalyzeResDto;
import com.ssafy.algonote.code.dto.response.ComplexityResDto;
import com.ssafy.algonote.code.service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/codes")
@RequiredArgsConstructor
public class CodeController {

    private final CodeService codeService;

    @PostMapping("/analyze")
    public ResponseEntity<AnalyzeResDto> analyzeCode(@RequestBody AnalyzeReqDto dto) {
        return ResponseEntity.ok(codeService.analyzeCode(dto));
    }

    @PostMapping("/complexity")
    public ResponseEntity<ComplexityResDto> getComplexity(@RequestBody ComplexityReqDto dto) {
        return ResponseEntity.ok(codeService.getComplexity(dto));
    }

}
