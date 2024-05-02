package com.ssafy.algonote.note.domain;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.problem.domain.Problem;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "note")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Mapping(mappingPath = "elastic/note/es-mapping.json")
@Setting(settingPath = "elastic/note/es-setting.json")
public class NoteDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Field(type= FieldType.Long)
    private Long problemId;

    @Field(type= FieldType.Text, analyzer = "nori")
    private String noteTitle;



    @Field(type= FieldType.Text, analyzer = "nori")
    private String problemTitle;


    @Field(type=FieldType.Text)
    private String memberNickname;

    @Field(type=FieldType.Text)
    private String content;

    public static NoteDocument of(Member member, Problem problem, String title, String content) {
        return NoteDocument.builder()
            .memberNickname(member.getNickname())
            .problemId(problem.getId())
            .problemTitle(problem.getTitle())
            .noteTitle(title)
            .content(content)
            .build();
    }
}
