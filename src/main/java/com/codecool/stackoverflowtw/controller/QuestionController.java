package com.codecool.stackoverflowtw.controller;

import com.codecool.stackoverflowtw.controller.dto.NewQuestionDTO;
import com.codecool.stackoverflowtw.controller.dto.QuestionDTO;
import com.codecool.stackoverflowtw.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("questions")
public class QuestionController {
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<QuestionDTO> getAllQuestionsSorted(
            @RequestParam(value = "sort_by", defaultValue = "") String sortBy,
            @RequestParam(value = "ordering", defaultValue = "false") Boolean ascending,
            @RequestParam(value = "search", defaultValue = "") String searchValue) {
        return questionService.getAllQuestionsSortedAndSearched(sortBy, ascending, searchValue);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all/search/{param}")
    public List<QuestionDTO> getAllQuestionsWithSearchParamInTitle(@PathVariable String param) {
        return questionService.getAllQuestionsWithSearchParamInTitle(param);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public QuestionDTO getQuestionById(@PathVariable int id) {
        return questionService.getQuestionById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/")
    public int addNewQuestion(@RequestBody NewQuestionDTO question) {
        return questionService.addNewQuestion(question);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public boolean deleteQuestionById(@PathVariable int id) {
        return questionService.deleteQuestionById(id);
    }
}
