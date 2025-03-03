import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Level2 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState({}); // ✅ Track answered questions
  const [timeLeft, setTimeLeft] = useState(200);
  const navigate = useNavigate();
  const level1Score = parseInt(localStorage.getItem("level1Score")) || 0;

  useEffect(() => {
    const customQuestions = [
      { id: 1, text: "What is the capital of France?", answer: "Paris", marks: 5 },
      { id: 2, text: "Solve: 12 + 8 = ?", answer: "20", marks: 10 },
      { id: 3, text: "Fill in the blank: The sun rises in the ___", answer: "east", marks: 5 },
      { id: 4, text: "Solve: 5 × 6 = ?", answer: "30", marks: 10 },
      { id: 5, text: "Who wrote 'To Kill a Mockingbird'?", answer: "Lee", marks: 5 }
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
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentQuestion]: e.target.value });
  };

  const handleNext = () => {
    const currentQ = questions[currentQuestion];
    const currentAnswer = answers[currentQuestion]?.trim().toLowerCase();
    const correctAnswer = currentQ.answer.toLowerCase();
   
    if (currentAnswer === correctAnswer) {
      if (!answeredCorrectly[currentQuestion]) {
        setScore((Score) => Score + currentQ.marks);
        
        setAnsweredCorrectly((prev) => ({ ...prev, [currentQuestion]: true })); // ✅ Mark as answered
      }
    } else {
      setAnsweredCorrectly((prev) => ({ ...prev, [currentQuestion]: false })); // ✅ Mark as incorrect
    }
    console.log("score",score);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const currentQ = questions[currentQuestion];
    const currentAnswer = answers[currentQuestion]?.trim().toLowerCase();
    const correctAnswer = currentQ.answer.toLowerCase();

    // Check the last question before submitting
    console.log(currentAnswer);
    console.log(correctAnswer);
    let updatedScore = score;
  if (currentAnswer === correctAnswer && !answeredCorrectly[currentQuestion]) {
    updatedScore += currentQ.marks;
    setAnsweredCorrectly((prev) => ({ ...prev, [currentQuestion]: true }));
  }
  const email = localStorage.getItem("email");
  if (!email) {
    console.error("No email found in localStorage");
    return;
  }
  try {
    const response = await axios.post("http://localhost:5000/api/update-level2score", {
      email,
      level2Score: updatedScore,
    });
    console.log("Level 2 score updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating level2 score:", error);
  }
  // Update the state (asynchronously) and use updatedScore for submission
  setScore(updatedScore);
  const finalScore = level1Score + updatedScore;

  setSubmitted(true);
    // try {
    //   await axios.post("http://localhost:5000/api/submit", { answers, score: finalScore });
    // } catch (error) {
    //   console.error("Error submitting answers:", error);
    // }

    localStorage.setItem("finalScore", finalScore);
    navigate("/score", { state: { level1Score, level2Score: score, finalScore } });
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {questions.length > 0 ? (
        <>
          <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-semibold">
                Question {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-lg font-bold text-red-400">
                ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-lg text-yellow-300">Marks: {questions[currentQuestion].marks}</h3>
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
              >⬅ Previous</button>
              {currentQuestion < questions.length - 1 ? (
                <button 
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  onClick={handleNext}
                >Next ➡</button>
              ) : (
                <button 
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={handleSubmit}
                >Submit ✅</button>
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
