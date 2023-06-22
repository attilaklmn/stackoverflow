import { Card, CardHeader } from "@mui/material";
import { Fragment } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


const AnswerCard = (props) => {
  const { id, answer, questionId, createDate, userName } = props.answerObject;

  const handleDeleteAnswer = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/answers/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        props.reload();
        return data;
      } catch (error) {
        console.error("Error deleting answer: ", error);
      }
      
  }

  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader title={userName} subheader={createDate}
      action={
        <Fragment>
          <IconButton
            onClick={handleDeleteAnswer}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Fragment>
      } />
      {answer}
    </Card>
  );
};

export default AnswerCard;
