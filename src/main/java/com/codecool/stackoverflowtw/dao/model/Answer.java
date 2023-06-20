package com.codecool.stackoverflowtw.dao.model;

import java.time.LocalDateTime;

public record Answer (int id, String answer, int questionId, LocalDateTime createDate, String userName){
}
