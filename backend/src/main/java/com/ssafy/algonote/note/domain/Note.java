package com.ssafy.algonote.note.domain;

import com.ssafy.algonote.common.BaseEntity;
import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.problem.domain.Problem;
import jakarta.persistence.*;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Note extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Heart> hearts;

    private String title;
    private String content;

}
