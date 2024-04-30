package com.ssafy.algonote.utils.gpt;

import com.ssafy.algonote.utils.gpt.dto.GptDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/gpt")
public class GptTestController {

    private final GptService gptService;

    @PostMapping("/time-complexity")
    public ResponseEntity<?> getTimeComplexity(@RequestBody GptDto dto) {
        return ResponseEntity.ok(gptService.getTimeComplexity(dto.msg()));
    }

    @PostMapping("/space-complexity")
    public ResponseEntity<?> getSpaceComplexity(@RequestBody GptDto dto) {
        return ResponseEntity.ok(gptService.getSpaceComplexity(dto.msg()));
    }

}