import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/login";
import HomePage from "./Components/home";
import Level1 from "./Components/Level1";
import Leaderboard from "./Components/Leaderboard";
import Level2 from "./Components/level2";
import Score from "./Components/score";
import Level3 from "./Components/Level3"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/level2" element={<Level2 />} />
       <Route path="/score" element={<Score />} />
        <Route path="/Level3" element={<Level3 />} />
      </Routes>
    </Router>
  );
}

export default App;
