package com.ssafy.algonote;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AlgonoteApplication {

	public static void main(String[] args) {
		// Dotenv dotenv = Dotenv.load();
		// System.setProperty("spring.datasource.url", dotenv.get("LOCAL_MYSQL_URL"));
		// System.setProperty("spring.datasource.username", dotenv.get("LOCAL_MYSQL_USERNAME"));
		// System.setProperty("spring.datasource.password", dotenv.get("LOCAL_MYSQL_PASSWORD"));

		SpringApplication.run(AlgonoteApplication.class, args);
	}

}
