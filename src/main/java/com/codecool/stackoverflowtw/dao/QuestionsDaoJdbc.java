package com.codecool.stackoverflowtw.dao;

import com.codecool.stackoverflowtw.dao.model.Question;
import com.codecool.stackoverflowtw.sql.database.Database;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class QuestionsDaoJdbc implements QuestionsDAO {
    private final Database database;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public QuestionsDaoJdbc(Database database) {
        this.database = database;
    }

    @Override
    public List<Question> getAllQuestions() {
        String query = "SELECT * FROM question ORDER BY id ASC";
        try (Connection connection = database.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {
            List<Question> allQuestions = new ArrayList<>();
            while (resultSet.next()) {
                allQuestions.add(getAllQuestionDetailsFromResultSet(resultSet));
            }
            return allQuestions;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Question getQuestionById(int id) {
        String query = "SELECT * FROM question WHERE id = ?";
        try (Connection connection = database.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return getAllQuestionDetailsFromResultSet(resultSet);
                } else {
                    throw new RuntimeException("Question id not found: " + id);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private Question getAllQuestionDetailsFromResultSet(ResultSet resultSet) {
        try {
            return new Question(resultSet.getInt("id"), resultSet.getString("title"), resultSet.getString("description"), resultSet.getTimestamp("created").toLocalDateTime(), resultSet.getString("username"));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteQuestionById(int id) {
        String template = "DELETE FROM question WHERE id = ?";
        try (Connection connection = database.getConnection();
             PreparedStatement statement = connection.prepareStatement(template)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int addNewQuestion(String title, String description, String userName) {
        String template = "INSERT INTO question (title, description, username) VALUES (?,?,?)";
        try (Connection connection = database.getConnection();
             PreparedStatement statement = connection.prepareStatement(template, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, title);
            statement.setString(2, description);
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
    public List<Question> getAllQuestionsSorted(String propertyToSortBy, boolean ascending) {
        String query = "SELECT * FROM question ORDER BY ? ?";
        try (Connection connection = database.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, propertyToSortBy);
            statement.setString(2, ascending ? "ASC" : "DESC");
             ResultSet resultSet = statement.executeQuery();
            List<Question> allQuestions = new ArrayList<>();
            while (resultSet.next()) {
                allQuestions.add(getAllQuestionDetailsFromResultSet(resultSet));
            }
            return allQuestions;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
