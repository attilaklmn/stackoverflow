package com.codecool.stackoverflowtw.service;

import com.codecool.stackoverflowtw.dao.QuestionsDAO;
import com.codecool.stackoverflowtw.controller.dto.NewQuestionDTO;
import com.codecool.stackoverflowtw.controller.dto.QuestionDTO;
import com.codecool.stackoverflowtw.dao.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private QuestionsDAO questionsDAO;

    @Autowired
    public QuestionService(QuestionsDAO questionsDAO) {
        this.questionsDAO = questionsDAO;
    }

    public List<QuestionDTO> getAllQuestions() {
        List<Question> allQuestions = questionsDAO.getAllQuestions();
        return allQuestions.stream().map(question -> new QuestionDTO(question.id(), question.title(), question.desc(), question.createDate())).collect(Collectors.toList());
    }

    public QuestionDTO getQuestionById(int id) {
        Question questionById = questionsDAO.getQuestionById(id);
        return new QuestionDTO(questionById.id(), questionById.title(), questionById.desc(), questionById.createDate());
    }

    public boolean deleteQuestionById(int id) {
        questionsDAO.deleteQuestionById(id);
        return false;
    }

    public int addNewQuestion(NewQuestionDTO question) {
        // TODO
        int createdId = 0;
        return createdId;
    }
}
