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

  const handleSubmitButtonClick = () => {};

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
          />
          <TextField
            sx={{ margin: 1, width: "85%" }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={handleNewQuestionTitleChange}
          />
          <TextField
            sx={{ margin: 1, width: "85%" }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            onChange={handleNewQuestionDescriptionChange}
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
