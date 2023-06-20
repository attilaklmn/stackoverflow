package com.codecool.stackoverflowtw.dao.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record Question(int id, String title, String desc, LocalDateTime createDate) {

}
