package com.codecool.stackoverflowtw.dao.model;

import java.time.LocalDate;

public record Question(int id, String title, String desc, LocalDate createDate) {

}
