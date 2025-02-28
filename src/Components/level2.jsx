import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Level1 from "./Level1";

const Level2 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(200); // 20 minutes
  const navigate = useNavigate();
  const location = useLocation();
  //const level1Score = location.state?.level1Score || 0; // Get Level 1 score
  const level1Score = parseInt(localStorage.getItem("level1Score")) || 0; // ✅ Load saved score


  useEffect(() => {
    // Sample questions
    const customQuestions = [
      { id: 1, text: "What is the capital of France?", answer: "Paris", marks: 5 },
      { id: 2, text: "Solve: 12 + 8 = ?", answer: "20", marks: 10 },
      { id: 3, text: "Fill in the blank: The sun rises in the ___", answer: "east", marks: 5 },
      { id: 4, text: "Solve: 5 × 6 = ?", answer: "30", marks: 10 },
      { id: 5, text: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee", marks: 5 }
    ];
    setQuestions(customQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit(); // Auto-submit on timeout
    }
  }, [timeLeft]);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentQuestion]: e.target.value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((q, index) => {
      if (answers[index]?.trim().toLowerCase() === q.answer.toLowerCase()) {
        totalScore += q.marks;
      }
    });
    return totalScore;
  };

  const handleSubmit = async () => {
    const totalScore = calculateScore();
    setScore(totalScore);
    setSubmitted(true);
    const finalScore = level1Score + totalScore; // Add Level 1 and Level 2 Scores

    try {
      await axios.post("/api/submit", { answers, score: totalScore });
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
    localStorage.setItem("finalScore", finalScore);
    navigate("/score", {
      state: {
        level1Score,
        level2Score: totalScore,
        finalScore, // Pass combined score
      },
    });
  };
  const totalPossibleScore = 35 + level1Score; // Max score from Level 1 + Level 2
  //const passingScore = (2 / 3) * totalPossibleScore; // 2/3 of total score


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {questions.length > 0 ? (
        <>
          <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-semibold">
                Question {currentQuestion + 1} / {questions.length}
              </span>
              {/* Timer Display */}
              <span className="text-lg font-bold text-red-400">
                ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-lg text-yellow-300">Marks: {questions[currentQuestion].marks}</h3>

            {/* Question Box */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-white">{questions[currentQuestion]?.text}</h2>
              <textarea
                className="w-full p-2 mt-2 text-black bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Type your answer here..."
                value={answers[currentQuestion] || ""}
                onChange={handleAnswerChange}
              ></textarea>
            </div>

            <div className="flex justify-between mt-4">
              <button 
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ⬅ Previous
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button 
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  onClick={handleNext}
                >
                  Next ➡
                </button>
              ) : (
                <button 
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={handleSubmit}
                >
                  Submit ✅
                </button>
              )}
            </div>
          </div>

          {submitted && (
            <div className="mt-6 text-2xl font-bold text-green-400">
              Your Score: {score} / 35
            </div>
          )}

        
        </>
      ) : (
        <p className="text-gray-300">Loading questions...</p>
      )}
    </div>
  );
};

export default Level2;



/*{submitted && (level1Score + score) > passingScore && (
            <button
              className="px-6 py-3 mt-6 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              onClick={() => navigate("/level3")}
            >
              Proceed to Level 3 🚀
            </button>
          )}

          */