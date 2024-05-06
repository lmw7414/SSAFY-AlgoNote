package com.ssafy.algonote.note.domain;

import com.ssafy.algonote.member.domain.Member;
import com.ssafy.algonote.problem.domain.Problem;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "note")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Mapping(mappingPath = "elastic/note/es-mapping.json")
@Setting(settingPath = "elastic/note/es-setting.json")
@ToString
public class NoteDocument {
    @Id
    private Long id;

    @Field(type = FieldType.Text,analyzer = "nori_ngram_analyzer", searchAnalyzer = "nori_analyzer")
    private String problemId;

    @Field(type = FieldType.Text,analyzer = "nori_ngram_analyzer", searchAnalyzer = "nori_analyzer")
    private String noteTitle;

    @Field(type = FieldType.Text,analyzer = "nori_ngram_analyzer", searchAnalyzer = "nori_analyzer")
    private String problemTitle;


    @Field(type=FieldType.Text)
    private String memberNickname;

    @Field(type=FieldType.Text)
    private String content;

    public static NoteDocument of(Long noteId, Member member, Problem problem, String title, String content) {
        return NoteDocument.builder()
                .id(noteId)
                .memberNickname(member.getNickname())
                .problemId(String.valueOf(problem.getId()))
                .problemTitle(problem.getTitle())
                .noteTitle(title)
                .content(content)
                .build();
    }


}
