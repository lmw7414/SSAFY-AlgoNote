package com.ssafy.algonote.member.controller;

import com.ssafy.algonote.config.security.SecurityUtil;
import com.ssafy.algonote.member.dto.response.ProfileInfoResDto;
import com.ssafy.algonote.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Member API", description = "회원 관련 API")
@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {


    private final MemberService memberService;

    @Operation(
        summary = "멤버 정보 조회",
        description = "회원 정보를 조회합니다."
    )
    @GetMapping()
    public ResponseEntity<ProfileInfoResDto> getProfileInfo(@RequestParam("memberId") Long memberId){
        return ResponseEntity.ok(memberService.getProfileInfo(memberId));
    }

    @Operation(
        summary = "멤버 정보 수정",
        description = "닉네임과 프로필이미지를 수정합니다."
    )
    @PutMapping("/update")
    public ResponseEntity<Void> updateProfile(@RequestPart(value="nickname", required = false) String updateNickname,
                                       @RequestPart(value="profileImg", required = false) MultipartFile profileImg) {
        Long memberId = SecurityUtil.getMemberId();
        log.info("memberId : {}", memberId);
        log.info("nickname : {}", updateNickname);
        log.info("profileImg : {}", profileImg);
        memberService.update(memberId, updateNickname, profileImg);
        return ResponseEntity.ok().build();
    }

}
