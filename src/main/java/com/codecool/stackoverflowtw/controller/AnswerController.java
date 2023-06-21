package com.codecool.stackoverflowtw.controller;

import com.codecool.stackoverflowtw.controller.dto.AnswerDTO;
import com.codecool.stackoverflowtw.controller.dto.NewAnswerDTO;
import com.codecool.stackoverflowtw.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("answers")
public class AnswerController {
    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public List<AnswerDTO> getAllAnswersForQuestionID(@PathVariable int id) {
        return answerService.getAllAnswersForQuestionID(id);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/new")
    public int addNewAnswer(@RequestBody NewAnswerDTO answerDTO) {
        return answerService.addNewAnswer(answerDTO);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public boolean deleteAnswerById(@PathVariable int id) {
        return answerService.deleteAnswer(id);
    }
}
