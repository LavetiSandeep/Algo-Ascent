import React from "react";

const Thank_you = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-md p-10 text-center bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">🎉 Thank You! 🎉</h1>
        <p className="text-lg text-gray-600">
          We appreciate your participation. Your submission has been recorded.
        </p>
        <div className="mt-6">
          <button 
            className="px-6 py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => window.location.href = "/leaderboard"}
          >
            LeaderBoard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thank_you;
