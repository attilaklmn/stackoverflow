import { Card, CardHeader } from "@mui/material";

const AnswerCard = (props) => {
  const { id, answer, questionId, createDate, userName } = props.answerObject;
  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader title={userName} subheader={createDate} />
      {answer}
    </Card>
  );
};

export default AnswerCard;
