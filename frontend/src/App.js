import QuestionCard from './components/QuestionCard'
import './App.css';
import AppBar from './components/Appbar';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar/>
      <Container sx={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
        <QuestionCard/>
        <QuestionCard/>
      </Container>
    </div>
  );
}

export default App;
