package com.codecool.stackoverflowtw.dao;

import com.codecool.stackoverflowtw.dao.model.Answer;
import com.codecool.stackoverflowtw.sql.database.Database;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.*;
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
            ResultSet resultSet = statement.executeQuery();
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
             PreparedStatement statement = connection.prepareStatement(template, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, answer);
            statement.setInt(2, questionId);
            statement.setString(3, userName);
            int affectedRows = statement.executeUpdate();
            if (affectedRows > 0) {
                ResultSet resultSet = statement.getGeneratedKeys();
                if (resultSet.next()) {
                    return resultSet.getInt(1);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        throw new RuntimeException("Failed to add new question.");
    }

    @Override
    public boolean deleteAnswerById(int id) {
        String template = "DELETE FROM answer WHERE id = ?";
        try (Connection connection = database.getConnection();
             PreparedStatement statement = connection.prepareStatement(template)) {
            statement.setInt(1, id);
            int rowsAffected = statement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
