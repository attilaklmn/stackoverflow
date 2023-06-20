package com.codecool.stackoverflowtw;

import com.codecool.stackoverflowtw.dao.QuestionsDAO;
import com.codecool.stackoverflowtw.dao.QuestionsDaoJdbc;
import com.codecool.stackoverflowtw.sql.database.Database;
import com.codecool.stackoverflowtw.sql.initialize.TableInitializer;
import com.codecool.stackoverflowtw.sql.initialize.TableStatements;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Map;

@SpringBootApplication
public class StackoverflowTwApplication {
    private static Database database;

    public static void main(String[] args) {
        database = new Database(
                "jdbc:postgresql://localhost:5432/invoice",
                "postgres",
                "Mo1991may");

        Map<String, String> tables = Map.of(
                "question", TableStatements.QUESTION,
                "answer", TableStatements.ANSWER

        );
        TableInitializer tableInitializer = new TableInitializer(database, tables);
        tableInitializer.initialize();


        SpringApplication.run(StackoverflowTwApplication.class, args);
    }

    @Bean
    public QuestionsDAO questionsDAO() {
        return new QuestionsDaoJdbc(database);
    }
}
