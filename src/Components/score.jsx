/*import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { level1Score, level2Score } = location.state || {}; 
  const finalScore = (level1Score || 0) + (level2Score || 0); // ✅ Ensure correct total
  const requiredScoreForLevel3 = (2/3) * finalScore;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-br from-gray-900 to-gray-800">
       <h1 className="text-3xl font-bold">Final Score</h1>
        <div className="p-8 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-green-400">Congratulations!</h2>
        <p className="text-lg">You have completed Level 2 of Algo Ascent.</p>
        <div className="mt-4 text-xl">
          <p>Level 1 Score: {level1Score} / 50</p>
          <p>Level 2 Score: {level2Score} / 35</p>
          <p className="font-bold text-yellow-300">Final Score: {finalScore} / 85</p>
          </div>
          { finalScore >= requiredScoreForLevel3 ? (
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
        
      
    </div>
  );
};

export default Score;
*/

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { level1Score = 0, level2Score = 0, finalScore = 0 } = location.state || {};
  const totalPossibleScore = 50 + 35; // Adjust based on your max scores in Level 1 & Level 2
  const requiredScoreForLevel3 = (2 / 3) * totalPossibleScore; // 2/3 of total score

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      <h1 className="text-3xl font-bold">Final Score</h1>
      <p className="text-xl">Level 1 Score: {level1Score}</p>
      <p className="text-xl">Level 2 Score: {level2Score}</p>
      <p className="text-2xl font-bold">Total Score: {finalScore}</p>

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

