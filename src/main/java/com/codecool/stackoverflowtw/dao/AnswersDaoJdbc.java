package com.codecool.stackoverflowtw.dao;

import com.codecool.stackoverflowtw.dao.model.Answer;
import com.codecool.stackoverflowtw.sql.database.Database;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AnswersDaoJdbc implements AnswersDAO {
    private final Database database;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public AnswersDaoJdbc(Database database) {
        this.database = database;
    }

    @Override
    public List<Answer> getAllAnswersForQuestionID(int questionId) {
        String query = "SELECT * FROM answer WHERE question_id = ?";
        try (Connection connection = database.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, questionId);
            ResultSet resultSet = statement.executeQuery(query);
            List<Answer> allQuestions = new ArrayList<>();
            while (resultSet.next()) {
                allQuestions.add(getAllAnswerDetailsFromResultSet(resultSet));
            }
            return allQuestions;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private Answer getAllAnswerDetailsFromResultSet(ResultSet resultSet) {
        try {
            return new Answer(resultSet.getInt("id"), resultSet.getString("answer"), resultSet.getInt("question_id"), resultSet.getTimestamp("created").toLocalDateTime(), resultSet.getString("username"));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int addNewAnswer(String answer, String userName, int questionId) {
        String template = "INSERT INTO answer (answer, question_id, username) VALUES (?,?,?)";
        try (Connection connection = database.getConnection();
             PreparedStatement statement = connection.prepareStatement(template)) {
            statement.setString(1, answer);
            statement.setInt(1, questionId);
            statement.setString(1, userName);
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            return resultSet.getInt("id");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteAnswerById(int id) {
        String template = "DELETE FROM answer WHERE id = ?";
        try (Connection connection = database.getConnection();
             PreparedStatement statement = connection.prepareStatement(template)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
