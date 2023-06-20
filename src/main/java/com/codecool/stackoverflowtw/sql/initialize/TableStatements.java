package com.codecool.stackoverflowtw.sql.initialize;

public interface TableStatements {
    String QUESTION = "CREATE TABLE question (id SERIAL UNIQUE, title TEXT NOT NULL, description TEXT, created TIMESTAMP)";

    String ANSWER = "CREATE TABLE answer (id SERIAL UNIQUE, answer TEXT, question_id INT, created TIMESTAMP)";
}
