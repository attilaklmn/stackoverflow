package com.codecool.stackoverflowtw.dao;

import com.codecool.stackoverflowtw.dao.model.Answer;

import java.util.List;

public interface AnswersDAO {
    List<Answer> getAllAnswersForQuestionID(int questionId);
    int addNewAnswer(String answer, String userName, int questionId);
    void deleteAnswerById(int id);
}
