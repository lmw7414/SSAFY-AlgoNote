package com.ssafy.algonote.common;

import com.ssafy.algonote.member.domain.Member;
import lombok.experimental.UtilityClass;

@UtilityClass
public class AdminMemberProvider {

    private Member adminMember = Member.builder()
        .nickname("시스템 알림")
        .profileImg("https://algonote.s3.ap-northeast-2.amazonaws.com/e65fd773-9dfc-4731-9db5-5781b9c8bef5.png")
        .build();

    public Member getAdminMember() {
        return adminMember;
    }

}