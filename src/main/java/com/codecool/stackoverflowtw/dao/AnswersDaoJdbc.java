package com.codecool.stackoverflowtw.dao;

import com.codecool.stackoverflowtw.sql.database.Database;
import org.springframework.beans.factory.annotation.Autowired;

public class AnswersDaoJdbc implements AnswersDAO{
    private final Database database;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public AnswersDaoJdbc(Database database) {
        this.database = database;
    }
}
