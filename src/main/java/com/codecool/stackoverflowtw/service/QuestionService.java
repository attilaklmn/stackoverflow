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
    public List<QuestionDTO> getAllQuestionsWithSearchParamInTitle(String searchParam) {
        List<Question> allQuestions = questionsDAO.searchInQuestionTitles(searchParam);
        return allQuestions.stream().map(question -> new QuestionDTO(question.id(), question.title(), question.desc(), question.createDate(), question.userName())).collect(Collectors.toList());

    }
    public List<QuestionDTO> getAllQuestions() {
        List<Question> allQuestions = questionsDAO.getAllQuestions();
        return allQuestions.stream().map(question -> new QuestionDTO(question.id(), question.title(), question.desc(), question.createDate(), question.userName())).collect(Collectors.toList());
    }

    public QuestionDTO getQuestionById(int id) {
        Question questionById = questionsDAO.getQuestionById(id);
        return new QuestionDTO(questionById.id(), questionById.title(), questionById.desc(), questionById.createDate(), questionById.userName());
    }

    public boolean deleteQuestionById(int id) {
        return questionsDAO.deleteQuestionById(id);
    }

    public int addNewQuestion(NewQuestionDTO question) {
        return questionsDAO.addNewQuestion(question.title(),question.description(),question.userName());
    }

    public List<QuestionDTO> getAllQuestionsSorted(String propertyToSortBy, boolean ascending) {
        List<Question> allQuestions = questionsDAO.getAllQuestionsSorted(propertyToSortBy, ascending);
        return allQuestions.stream().map(question -> new QuestionDTO(question.id(), question.title(), question.desc(), question.createDate(), question.userName())).collect(Collectors.toList());
    };
    public List<QuestionDTO> getAllQuestionsSortedAndSearched(String propertyToSortBy, boolean ascending, String searchValue) {
        if (propertyToSortBy.equals("") && searchValue.equals("")) {
            return getAllQuestions();
        } else if (searchValue.equals("")) {
            return getAllQuestionsSorted(propertyToSortBy, ascending);
        } else if (propertyToSortBy.equals("")) {
            return getAllQuestionsWithSearchParamInTitle(searchValue);
        } else {
            List<Question> allQuestions = questionsDAO.getAllQuestionsSortedAndSearched(propertyToSortBy, ascending, searchValue);
            return allQuestions.stream().map(question -> new QuestionDTO(question.id(), question.title(), question.desc(), question.createDate(), question.userName())).collect(Collectors.toList());

        }

        };

}
