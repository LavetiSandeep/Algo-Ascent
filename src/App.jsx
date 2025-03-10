import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/login";
import HomePage from "./Components/home";
import Level1 from "./Components/Level1";
import Leaderboard from "./Components/Leaderboard";
import Level2 from "./Components/level2";
import Score from "./Components/score";
import Level3 from "./Components/Level3.jsx";
import WaitingPage from "./Components/waitingpg1.jsx";
import WaitingPage2 from "./Components/waitingpg2.jsx";
import EventWaiting from "./Components/EventWaiting.jsx"
import Thank_you from "./Components/Thank_you.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Level1" element={<Level1 />} />
        <Route path="/waitingpg1" element={<WaitingPage />} />
        <Route path="/waitingpg2" element={<WaitingPage2 />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/thankyou" element={<Thank_you />} />

       <Route path="/score" element={<Score />} />
       <Route path="/Level3" element={<Level3 />} />
       <Route path="/waiting" element={<EventWaiting />} />


      </Routes>
    </Router>
  );
}

export default App;
