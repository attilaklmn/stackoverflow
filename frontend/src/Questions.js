import NewQuestionCard from "./components/NewQuestionCard";
import QuestionCard from "./components/QuestionCard";
import { Container } from "@mui/material";

const DUMMY_QUESTIONS = [
  {
    id: 1,
    title: "title1",
    desc: "description 1",
    createDate: "create date",
    userName: "user1",
  },
  {
    id: 2,
    title: "title2",
    desc: "description 2",
    createDate: "create date",
    userName: "user2",
  },
  {
    id: 3,
    title: "title3",
    desc: "description 3",
    createDate: "create date",
    userName: "user3",
  },
];

const Questions = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <NewQuestionCard />
      {DUMMY_QUESTIONS.map((e) => {
        return <QuestionCard question={e} />;
      })}
    </Container>
  );
};

export default Questions;
