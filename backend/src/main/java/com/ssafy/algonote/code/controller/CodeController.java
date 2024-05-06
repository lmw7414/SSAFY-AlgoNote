package com.ssafy.algonote.code.controller;

import com.ssafy.algonote.code.dto.request.AnalyzeReqDto;
import com.ssafy.algonote.code.dto.request.ComplexityReqDto;
import com.ssafy.algonote.code.dto.response.AnalyzeResDto;
import com.ssafy.algonote.code.dto.response.ComplexityResDto;
import com.ssafy.algonote.code.service.CodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Code API", description = "코드 분석 관련 API")
@RestController
@RequestMapping("/codes")
@RequiredArgsConstructor
public class CodeController {

    private final CodeService codeService;

    @PostMapping("/analyze")
    public ResponseEntity<AnalyzeResDto> analyzeCode(@RequestBody AnalyzeReqDto dto) {
        return ResponseEntity.ok(codeService.analyzeCode(dto));
    }

    @Operation(
        summary = "복잡도 계산",
        description = "코드에 대한 시간 복잡도와 공간 복잡도를 계산합니다."
    )
    @PostMapping("/complexity")
    public ResponseEntity<ComplexityResDto> getComplexity(@RequestBody ComplexityReqDto dto) {
        return ResponseEntity.ok(codeService.getComplexity(dto));
    }

}
