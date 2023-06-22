import { useEffect, useState } from "react";
import NewQuestionCard from "./components/NewQuestionCard";
import QuestionCard from "./components/QuestionCard";
import { Container } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SortBar from "./components/SortBar";

const fetchAllQuestions = async (setQuestions, setIsLoading) => {
  try {
    const response = await fetch("http://localhost:8080/questions/all");
    const data = await response.json();
    setQuestions(data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching questions: ", error);
  }
};

const fetchSortedAndSearchedQuestions = async (queryString, setQuestions) => {
  try {
    const response = await fetch(
      `http://localhost:8080/questions/all?${queryString}`
    );
    const data = await response.json();
    setQuestions(data);
  } catch (error) {
    console.error("Error fetching questions: ", error);
  }
};

const deleteQuestion = async (questionId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/questions/${questionId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting question: ", error);
  }
};

const Questions = () => {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllQuestions(setQuestions, setIsLoading);
  }, []);

  const reload = () => {
    fetchAllQuestions(setQuestions, setIsLoading);
  };

  const handleSortAndSearch = (queryString) => {
    fetchSortedAndSearchedQuestions(queryString, setQuestions);
  };

  const handleDeleteQuestionClick = async (questionId) => {
    await deleteQuestion(questionId);
    reload();
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <SortBar
        reload={reload}
        handleSortAndSearch={handleSortAndSearch}
      ></SortBar>
      <NewQuestionCard reload={reload} />
      {isLoading && <LoadingButton />}
      {!isLoading &&
        questions.map((e, i) => {
          return (
            <QuestionCard
              key={i}
              question={e}
              onDeleteQuestionClick={handleDeleteQuestionClick}
            />
          );
        })}
    </Container>
  );
};

export default Questions;
