package com.codecool.stackoverflowtw.service;

import com.codecool.stackoverflowtw.controller.dto.AnswerDTO;
import com.codecool.stackoverflowtw.controller.dto.NewAnswerDTO;
import com.codecool.stackoverflowtw.dao.AnswersDAO;
import com.codecool.stackoverflowtw.dao.model.Answer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class AnswerService {
    private AnswersDAO answersDAO;
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public AnswerService(AnswersDAO answersDAO) {
        this.answersDAO = answersDAO;
    }

    public List<AnswerDTO> getAllAnswersForQuestionID(int questionId) {
        List<Answer> allAnswersOfQuestion = answersDAO.getAllAnswersForQuestionID(questionId);
        return allAnswersOfQuestion.stream().map(answer -> new AnswerDTO(answer.id(),answer.answer(), answer.questionId(),answer.createDate(),answer.userName())).collect(Collectors.toList());
    }
    public int addNewAnswer(NewAnswerDTO answerDTO) {
        return answersDAO.addNewAnswer(answerDTO.answer(), answerDTO.userName(), answerDTO.questionId());
    }
    public boolean deleteAnswer(int id) {
        return answersDAO.deleteAnswerById(id);
    }
}
