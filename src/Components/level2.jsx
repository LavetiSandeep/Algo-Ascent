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
  const [timeLeft, setTimeLeft] = useState();
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
    const quizDuration = 20 * 60 * 1000 ; // 20 minutes in milliseconds
    let startTime = localStorage.getItem("startTime");
  
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem("quizStartTime", startTime);
    }
  
    const updateTimer = () => {
      const startTime = new Date("2025/03/09 21:45:00");
      const elapsedTime = Date.now() - startTime;
      
      const newTimeLeft = Math.max(Math.floor((quizDuration - elapsedTime) / 1000), 0);

      const minutes = Math.floor(newTimeLeft / 60);
const seconds = newTimeLeft % 60;
  
      setTimeLeft(newTimeLeft);
  
      if (newTimeLeft === 0) {
        handleSubmit(); // Auto-submit when timer reaches 0
      }
    };
  
    updateTimer(); // Initial update
    const timerInterval = setInterval(updateTimer, 1000);
  
    return () => clearInterval(timerInterval);
  }, []);
  

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
    const response = await axios.post("https://backend-jofi.onrender.com/api/update-level2score", {
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
    

    localStorage.setItem("finalScore", finalScore);
    navigate("/score", { state: { level1Score, level2Score: score, finalScore } });
};


  return (

    
      <div 
      className="relative flex flex-col items-center justify-center min-h-screen p-4 text-white bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/lvl2.jpg')" }}  // Add your image path here
    >
        
  
    
    {/* ALGO ASCENT - Centered at the Top */}
    <h1 className="absolute text-5xl font-bold text-transparent transform -translate-x-1/2 top-6 left-1/2 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
      ALGO ASCENT
    </h1>

    {/* LEVEL-2 - Positioned Closer Beneath */}
    <h2 className="mt-1 text-3xl font-semibold text-yellow-300">
      LEVEL-2
    </h2>
        {/* Timer (Top Right) */}
        <div className="absolute text-3xl font-bold text-red-400 top-4 right-6">
          ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </div>
    
        {questions.length > 0 ? (
          <>
            {/* Question Container */}
            <div className="w-full max-w-5xl p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl 
                border-[3px] border-pink-400/50 hover:border-pink-400 shadow-pink-500 transition-all">

              
              {/* Question Number & Marks */}
              <div className="flex items-center justify-between mb-6">
  <span className="text-2xl font-semibold text-cyan-400 drop-shadow-lg">
    Question {currentQuestion + 1} / {questions.length}
  </span>
  <h3 className="text-xl transition-all text-cyan-300 drop-shadow-lg hover:text-cyan-200">
    Marks: {questions[currentQuestion].marks}
  </h3>
</div>

    
              {/* Question and Answer Side-by-Side */}
              <div className="flex items-start gap-8">
                {/* Question Text (Left Side) */}
                <h2 className="w-1/2 text-2xl font-semibold text-white">
                  {questions[currentQuestion]?.text}
                </h2>
    
                {/* Answer Input (Right Side) */}
                <textarea
                  className="flex-grow w-1/2 p-4 text-black bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="5"
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion] || ""}
                  onChange={handleAnswerChange}
                ></textarea>
              </div>
    
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button 
                  className="px-6 py-3 text-xl text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  ⬅ Previous
                </button>
                {currentQuestion < questions.length - 1 ? (
                  <button 
                    className="px-6 py-3 text-xl text-white bg-green-600 rounded-lg hover:bg-green-700"
                    onClick={handleNext}
                  >
                    Next ➡
                  </button>
                ) : (
                  <button 
                    className="px-6 py-3 text-xl text-white bg-red-600 rounded-lg hover:bg-red-700"
                    onClick={handleSubmit}
                  >
                    Submit ✅
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-2xl text-gray-300">Loading questions...</p>
        )}
      </div>
    );
};

export default Level2;
