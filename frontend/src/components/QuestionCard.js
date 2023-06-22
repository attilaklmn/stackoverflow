import { useState, useEffect, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { orange } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AnswerCard from "./AnswerCard";
import LoadingButton from "@mui/lab/LoadingButton";
import NewAnswerCard from "./NewAnswerCard";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function QuestionCard(props) {
  const [expanded, setExpanded] = useState(false);
  const [answers, setAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNewAnswer, setHasNewAnswer] = useState(false);
  const { id, title, description, createDate, userName } = props.question;

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/answers/${id}`);
        const data = await response.json();
        setAnswers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in fetching answers: ", error);
      }
    };
    fetchAnswers();
  }, [hasNewAnswer]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: "75%", maxWidth: "80%", margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: orange[700] }} aria-label="recipe">
            {userName[0].toUpperCase()}
          </Avatar>
        }
        action={
          <Fragment>
            <IconButton
              onClick={() => props.onDeleteQuestionClick(id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </Fragment>
        }
        title={userName}
        subheader={createDate}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {isLoading && <LoadingButton />}
          
          {!isLoading &&
            answers.map((e, i) => {
              return <AnswerCard key={i} answerObject={e} />;
            })}
          {!isLoading && <NewAnswerCard loadNewAnswer={() => setHasNewAnswer(!hasNewAnswer)} questionId={id} />}
        </CardContent>
      </Collapse>
    </Card>
  );
}
