import { useEffect, useState } from "react";
import NewQuestionCard from "./components/NewQuestionCard";
import QuestionCard from "./components/QuestionCard";
import { Container } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchBar from "./components/SearchBar";

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

const fetchSearchedQuestions = async (setQuestions, searchFieldText) => {
  try {
    const response = await fetch(
      `http://localhost:8080/questions/all/search/${searchFieldText}`
    );
    const data = await response.json();
    setQuestions(data);
  } catch (error) {
    console.error("Error fetching questions: ", error);
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

  const handleSearchFieldChange = (searchFieldText) => {
    if (searchFieldText) {
      fetchSearchedQuestions(setQuestions, searchFieldText);
    } else {
      fetchAllQuestions(setQuestions, setIsLoading);
    }
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
      <SearchBar onFieldChange={handleSearchFieldChange} />
      <NewQuestionCard reload={reload} />
      {isLoading && <LoadingButton />}
      {!isLoading &&
        questions.map((e) => {
          return <QuestionCard question={e} />;
        })}
    </Container>
  );
};

export default Questions;
