package com.codecool.stackoverflowtw.dao;

import com.codecool.stackoverflowtw.dao.model.Question;
import com.codecool.stackoverflowtw.sql.database.Database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class QuestionsDaoJdbc implements QuestionsDAO {
    private final Database database;

    public QuestionsDaoJdbc(Database database) {
        this.database = database;
    }

    @Override
    public void sayHi() {
        System.out.println("Hi DAO!");
    }

    @Override
    public List<Question> getAllQuestions() {
        String query = "SELECT * FROM question ORDER BY id ASC";
        try (Connection connection = database.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {
            List<Question> allQuestions= new ArrayList<>();
            while (resultSet.next()) {
                allQuestions.add(new Question(resultSet.getInt("id"), resultSet.getString("title"), resultSet.getString("desc"), resultSet.getDate("created").toLocalDate()));
            }
            return allQuestions;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
