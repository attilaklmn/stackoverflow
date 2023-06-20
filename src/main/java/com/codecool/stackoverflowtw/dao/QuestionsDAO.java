package com.codecool.stackoverflowtw.dao;


import com.codecool.stackoverflowtw.dao.model.Question;

import java.sql.ResultSet;
import java.util.List;

public interface QuestionsDAO {
    void sayHi();
    List<Question> getAllQuestions();
    Question getQuestionById(int id);
    void deleteQuestionById(int id);

    int addNewQuestion(String title, String description, String s);
}
