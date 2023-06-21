import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

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

const postNewQuestion = async (
  newUserName,
  newQuestionTitle,
  newQuestionDescription
) => {
  try {
    const response = await fetch("http://localhost:8080/questions/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: newQuestionTitle,
        description: newQuestionDescription,
        userName: newUserName,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching questions: ", error);
  }
};

const NewQuestionCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionDescription, setNewQuestionDescription] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUserNameFieldChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleNewQuestionTitleChange = (e) => {
    setNewQuestionTitle(e.target.value);
  };

  const handleNewQuestionDescriptionChange = (e) => {
    setNewQuestionDescription(e.target.value);
  };

  const handleSubmitButtonClick = async () => {
    if (newUserName && newQuestionTitle && newQuestionDescription) {
      await postNewQuestion(
        newUserName,
        newQuestionTitle,
        newQuestionDescription
      );
      props.reload();
      setNewUserName("");
      setNewQuestionTitle("");
      setNewQuestionDescription("");
      setExpanded(false);
    } else alert("Please fill all fields!");
  };

  return (
    <Card sx={{ minWidth: "75%", maxWidth: "80%", margin: 2 }}>
      <CardHeader title="Add new question"></CardHeader>
      <Collapse in={expanded}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ margin: 1, width: "85%" }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={handleUserNameFieldChange}
            value={newUserName ? newUserName : ""}
          />
          <TextField
            sx={{ margin: 1, width: "85%" }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={handleNewQuestionTitleChange}
            value={newQuestionTitle ? newQuestionTitle : ""}
          />
          <TextField
            sx={{ margin: 1, width: "85%" }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            onChange={handleNewQuestionDescriptionChange}
            value={newQuestionDescription ? newQuestionDescription : ""}
          />
          <Button
            sx={{ maxWidth: "20%" }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmitButtonClick}
          >
            Send
          </Button>
        </CardContent>
      </Collapse>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

export default NewQuestionCard;
