import React from "react";
import { useLocation } from "react-router-dom";

const Score = () => {
  const location = useLocation();
  const { level1Score, level2Score } = location.state || {}; 
  const finalScore = (level1Score || 0) + (level2Score || 0); // ✅ Ensure correct total
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-green-400">Congratulations!</h2>
        <p className="text-lg">You have completed Level 2 of Algo Ascent.</p>
        <div className="mt-4 text-xl">
          <p>Level 1 Score: {level1Score} / 150</p>
          <p>Level 2 Score: {level2Score} / 35</p>
          <p className="font-bold text-yellow-300">Final Score: {finalScore} / 145</p>
        </div>
      </div>
    </div>
  );
};

export default Score;
