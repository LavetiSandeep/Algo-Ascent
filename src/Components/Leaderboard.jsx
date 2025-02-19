import { useLocation, useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <p>Your Score: {score}</p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default Leaderboard;
