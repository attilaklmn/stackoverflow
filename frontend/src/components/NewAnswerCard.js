import { Card, CardHeader, CardContent, TextField, Button } from "@mui/material"
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const postNewAnswer = async (questionId, answer, userName) => {
    try {
        const response = await fetch("http://localhost:8080/answers/new", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            questionId: questionId,
            answer: answer,
            userName: userName
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
}


const NewAnswerCard = (props) => {
    const [newUserName, setNewUserName] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const questionId = props.questionId;
    

    const handleSubmit = async () => {
        if (newUserName && newAnswer) {
            await postNewAnswer(questionId, newAnswer, newUserName);
            props.loadNewAnswer();
            setNewAnswer("");
            setNewUserName("");
        } else alert("Please fill all fields!")
    }

    return (
        <Card>
            <CardHeader subheader="Add new answer"></CardHeader>
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
            onChange={e => setNewUserName(e.target.value)}
            value={newUserName ? newUserName : ""}
          />
          <TextField
            sx={{ margin: 1, width: "85%" }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            onChange={(e) => setNewAnswer(e.target.value)}
            value={newAnswer ? newAnswer : ""}
          />
          <Button
            sx={{ maxWidth: "20%" }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </CardContent>
        </Card>
    )
}

export default NewAnswerCard;