package com.ssafy.algonote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing

public class AlgonoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlgonoteApplication.class, args);
	}

}
