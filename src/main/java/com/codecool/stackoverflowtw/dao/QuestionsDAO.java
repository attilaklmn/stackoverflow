package com.codecool.stackoverflowtw.dao;


import com.codecool.stackoverflowtw.dao.model.Question;

import java.sql.ResultSet;
import java.util.List;

public interface QuestionsDAO {
    List<Question> getAllQuestions();

    Question getQuestionById(int id);

    boolean deleteQuestionById(int id);

    int addNewQuestion(String title, String description, String userName);

    List<Question> getAllQuestionsSorted(String propertyToSortBy, boolean ascending);
    List<Question> searchInQuestionTitles(String searchParam);
}
