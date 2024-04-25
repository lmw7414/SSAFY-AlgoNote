package com.ssafy.algonote.note.repository;

import com.ssafy.algonote.note.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

}
