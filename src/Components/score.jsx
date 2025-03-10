import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeRepairServiceOutlined } from "@mui/icons-material";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [scores, setScores] = useState({
    level1Score: 0,
    level2Score: 0,
    finalScore: 0,
  });
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("No email found in localStorage");
      setLoading(false);
      return;
    }

    const fetchScores = async () => {
      try {
        // Send GET request with email as a query parameter
        // const response = await axios.get (`https://backend-jofi.onrender.com/api/get-scores`);
        const response = await fetch("http://localhost:5000/api/get-scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email, // ✅ Use `finalScore` to ensure the latest value is sent
          }),
        });
        console.log(response);
        
        const result= await response.json();
        // console.log(result);
        const { level1Score, level2Score, finalScore }=result
      
        // Update the state with the fetched scores and calculated final score
        setScores({ level1Score, level2Score, finalScore });
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  // Destructure scores from state
  const { level1Score, level2Score, finalScore } = scores;

  // Define totalPossibleScore (assuming Level 2 max is 35) and compute required score for Level 3
  const totalPossibleScore = 150 + 60; 
  const requiredScoreForLevel3 = (2 / 3) * totalPossibleScore; // 2/3 of total score

  if (loading) return <p>Loading scores...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      <h1 className="text-3xl font-bold">Final Score</h1>
      <p className="text-xl">Level 1 Score: {level1Score}</p>
      <p className="text-xl">Level 2 Score: {level2Score}</p>
      <p className="text-2xl font-bold">Total Score: {finalScore}</p>
      <p className="text-xl">Required Score for Level 3: {requiredScoreForLevel3}</p>

      {finalScore >= requiredScoreForLevel3 ? (
        <button
          className="px-6 py-3 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700"
          onClick={() => navigate("/level3")}
        >
          🚀 Go to Level 3
        </button>
      ) : (
        <p className="mt-4 text-red-400">❌ You did not qualify for Level 3.</p>
      )}
    </div>
  );
};

export default ScorePage;
