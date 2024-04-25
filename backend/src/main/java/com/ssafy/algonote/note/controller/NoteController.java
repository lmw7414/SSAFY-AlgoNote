package com.ssafy.algonote.note.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.note.service.HeartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {

    private final HeartService heartService;
    @PostMapping("/{noteId}/heart")
    public ResponseEntity<Void> heart(@PathVariable("noteId") Long noteId) {
        log.info("noteId: {}", noteId);

        Long memberId = SecurityUtil.getUserId();
        heartService.heart(memberId, noteId);

        return ResponseEntity.ok().build();
    }

}
