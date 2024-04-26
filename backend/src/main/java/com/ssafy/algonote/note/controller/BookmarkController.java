package com.ssafy.algonote.note.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.note.dto.BookmarkRes;
import com.ssafy.algonote.note.dto.BookmarkStatusRes;
import com.ssafy.algonote.note.service.BookmarkService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/notes/{noteId}/bookmarks")
    public ResponseEntity<BookmarkStatusRes> doBookmark(@PathVariable Long noteId) {
        Long memberId = SecurityUtil.getMemberId();
        return ResponseEntity.ok(bookmarkService.doBookmark(memberId, noteId));
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<List<BookmarkRes>> getList(@RequestParam("memberId") Long memberId) {
        return ResponseEntity.ok(bookmarkService.getList(memberId));
    }

}
