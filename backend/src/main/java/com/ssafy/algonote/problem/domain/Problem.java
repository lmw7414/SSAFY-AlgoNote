package com.ssafy.algonote.problem.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Problem {

    @Id
    private Long id;
    private String title;
    private Integer tier;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    @Column(name = "tag")
    private Set<Tag> tags;

}
