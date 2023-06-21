import "./App.css";
import AppBar from "./components/Appbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Questions from "./Questions";
import Home from "./Home";
import { useState } from "react";
import SideMenu from "./SideMenu";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar handleDrawerToggle={handleDrawerToggle} />
        <SideMenu
          isOpen={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
