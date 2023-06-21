import QuestionCard from "./components/QuestionCard";
import { Container } from "@mui/material";

const Questions = () => {
    return (
        <Container sx={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
        <QuestionCard userName="user1" />
        <QuestionCard userName="user2" />
        </Container>
    )
}

export default Questions;