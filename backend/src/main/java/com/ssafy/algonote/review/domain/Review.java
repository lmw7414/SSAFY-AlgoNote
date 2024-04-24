package com.ssafy.algonote.review.domain;

import com.ssafy.algonote.common.BaseEntity;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.note.domain.Note;
import com.ssafy.algonote.review.dto.request.ReviewReq;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    private Note note;

    @Column(nullable = false)
    private int startLine;

    @Column(nullable = false)
    private int endLine;

    @Column(nullable = false)
    private String content;

    public static Review of(ReviewReq req, Member member, Note note) {
        return Review.builder()
            .startLine(req.startLine())
            .endLine(req.endLine())
            .content(req.content())
            .member(member)
            .note(note)
            .build();
    }

}
