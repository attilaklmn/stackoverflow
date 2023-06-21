package com.codecool.stackoverflowtw;

import com.codecool.stackoverflowtw.dao.AnswersDAO;
import com.codecool.stackoverflowtw.dao.AnswersDaoJdbc;
import com.codecool.stackoverflowtw.dao.QuestionsDAO;
import com.codecool.stackoverflowtw.dao.QuestionsDaoJdbc;
import com.codecool.stackoverflowtw.service.AnswerService;
import com.codecool.stackoverflowtw.sql.database.Database;
import com.codecool.stackoverflowtw.sql.initialize.TableInitializer;
import com.codecool.stackoverflowtw.sql.initialize.TableStatements;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Map;

@SpringBootApplication
public class StackoverflowTwApplication {

    public static void main(String[] args) {

        SpringApplication.run(StackoverflowTwApplication.class, args);
    }
    @Bean
    public QuestionsDAO questionsDAO(Database database) {
        return new QuestionsDaoJdbc(database);
    }

    @Bean
    public AnswersDAO answersDAO(Database database) {
        return new AnswersDaoJdbc(database);
    }

    @Bean
    public Database database() {
        Database database = new Database(
                System.getenv("DATABASE_URL"),
                System.getenv("DATABASE_USERNAME"),
                System.getenv("DATABASE_PASSWORD"));

        Map<String, String> tables = Map.of(
                "question", TableStatements.QUESTION,
                "answer", TableStatements.ANSWER

        );
        TableInitializer tableInitializer = new TableInitializer(database, tables);
        tableInitializer.initialize();
        return database;
    }
}
