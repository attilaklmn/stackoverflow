package com.codecool.stackoverflowtw.controller.dto;

import java.time.LocalDateTime;

public record AnswerDTO(int id, String answer, int questionId, LocalDateTime createDate, String userName) {
}
