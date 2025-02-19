/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level1 = () => {
  const navigate = useNavigate();
  const previousScore = parseInt(localStorage.getItem("score")) || 0; // ✅ Carry forward last round's score
  const [score, setScore] = useState(previousScore);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // ✅ 5 minutes countdown (300 seconds)

  // ✅ Computer Science Questions
  const questions = [
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "None of the above"], correctAnswer: "HyperText Markup Language" },
    { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Linked List", "Array"], correctAnswer: "Stack" },
    { question: "Which language is mainly used for Android development?", options: ["Java", "Python", "C#", "Swift"], correctAnswer: "Java" },
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctAnswer: "O(log n)" },
    { question: "Which protocol is used for secure communication over the internet?", options: ["HTTP", "FTP", "SSH", "HTTPS"], correctAnswer: "HTTPS" },
    { question: "Which company developed JavaScript?", options: ["Microsoft", "Apple", "Netscape", "Google"], correctAnswer: "Netscape" },
    { question: "What does SQL stand for?", options: ["Structured Query Language", "Sequential Query Language", "Standard Query Language", "Server Query Language"], correctAnswer: "Structured Query Language" },
    { question: "Which is the most used programming language in 2024?", options: ["JavaScript", "Python", "C++", "Rust"], correctAnswer: "Python" },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correctAnswer: "Cascading Style Sheets" },
    { question: "What is the output of 2 + '2' in JavaScript?", options: ["22", "4", "Error", "Undefined"], correctAnswer: "22" },
    { question: "What does the 'this' keyword refer to in JavaScript?", options: ["Current object", "Global object", "Function scope", "Local scope"], correctAnswer: "Current object" },
    { question: "Which algorithm is used in Merge Sort?", options: ["Divide and Conquer", "Greedy", "Backtracking", "Brute Force"], correctAnswer: "Divide and Conquer" },
    { question: "Which is the fastest data structure for searching?", options: ["Linked List", "Binary Search Tree", "Hash Table", "Array"], correctAnswer: "Hash Table" },
    { question: "Which operator is used for exponentiation in JavaScript?", options: ["^", "**", "^^", "exp()"], correctAnswer: "**" },
    { question: "What does API stand for?", options: ["Application Programming Interface", "Applied Processing Interface", "Application Protocol Integration", "Automated Process Integration"], correctAnswer: "Application Programming Interface" },
  ];

  // ✅ Timer Functionality
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // Auto-submit when time is up
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ Handle Option Selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // ✅ Handle Next Question
  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 10);
      
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  // ✅ Handle Back Question
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  // ✅ Handle Submit (Last Question)
  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 10);
      localStorage.setItem("score", score + 10);
    }
    navigate("/level2", { state: { score } }); // ✅ Move to Level 2
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">Level 1</h2>

      {/* ✅ Timer Display *}
      <p className="mb-2 text-lg font-semibold text-red-500">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</p>

      {/* ✅ Question Card *}
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          {questions[currentQuestionIndex].question}
        </h3>

        {/* ✅ Option Boxes *}
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div
              key={index}
              className={`p-3 border-2 rounded-lg text-center font-semibold cursor-pointer transition ${
                selectedOption === option
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>

        {/* ✅ Buttons *}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              currentQuestionIndex > 0
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>

          {currentQuestionIndex + 1 < questions.length ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 font-semibold text-white transition bg-green-500 rounded-lg hover:bg-green-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {/* ✅ Score Display *}
      <p className="mt-6 text-lg font-semibold">Score: {score}</p>
    </div>
  );
};

export default Level1;
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level1 = () => {
  const navigate = useNavigate();
  const previousScore = parseInt(localStorage.getItem("score")) || 0; // ✅ Carry forward previous score
  const [score, setScore] = useState(previousScore);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100); // ✅ 5 minutes countdown
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ Track if submitted early

  // ✅ Computer Science Questions
  const questions = [
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "None of the above"], correctAnswer: "HyperText Markup Language" },
    { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Linked List", "Array"], correctAnswer: "Stack" },
    { question: "Which language is mainly used for Android development?", options: ["Java", "Python", "C#", "Swift"], correctAnswer: "Java" },
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctAnswer: "O(log n)" },
    { question: "Which protocol is used for secure communication over the internet?", options: ["HTTP", "FTP", "SSH", "HTTPS"], correctAnswer: "HTTPS" },
    { question: "Which company developed JavaScript?", options: ["Microsoft", "Apple", "Netscape", "Google"], correctAnswer: "Netscape" },
    { question: "What does SQL stand for?", options: ["Structured Query Language", "Sequential Query Language", "Standard Query Language", "Server Query Language"], correctAnswer: "Structured Query Language" },
    { question: "Which is the most used programming language in 2024?", options: ["JavaScript", "Python", "C++", "Rust"], correctAnswer: "Python" },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correctAnswer: "Cascading Style Sheets" },
    { question: "What is the output of 2 + '2' in JavaScript?", options: ["22", "4", "Error", "Undefined"], correctAnswer: "22" },
    { question: "What does the 'this' keyword refer to in JavaScript?", options: ["Current object", "Global object", "Function scope", "Local scope"], correctAnswer: "Current object" },
    { question: "Which algorithm is used in Merge Sort?", options: ["Divide and Conquer", "Greedy", "Backtracking", "Brute Force"], correctAnswer: "Divide and Conquer" },
    { question: "Which is the fastest data structure for searching?", options: ["Linked List", "Binary Search Tree", "Hash Table", "Array"], correctAnswer: "Hash Table" },
    { question: "Which operator is used for exponentiation in JavaScript?", options: ["^", "**", "^^", "exp()"], correctAnswer: "**" },
    { question: "What does API stand for?", options: ["Application Programming Interface", "Applied Processing Interface", "Application Protocol Integration", "Automated Process Integration"], correctAnswer: "Application Programming Interface" },
  ];

  // ✅ Timer Functionality
  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/level2", { state: { score } }); // ✅ Move to Level 2 when time runs out
    }

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, navigate, score]);

  // ✅ Handle Option Selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // ✅ Handle Next Question
  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  // ✅ Handle Back Question
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  // ✅ Handle Submit (Last Question)
  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    }

    localStorage.setItem("score", score);
    setIsSubmitted(true); // ✅ Mark as submitted
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">Level 1</h2>

      {/* ✅ Timer Display */}
      <p className="mb-2 text-lg font-semibold text-red-500">
        Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </p>

      {/* ✅ Show Score if Submitted */}
      {isSubmitted ? (
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-green-600">Your Score: {score}</h3>
          <p className="text-lg text-gray-600">Wait for the timer to finish...</p>
        </div>
      ) : (
        <>
          {/* ✅ Question Card */}
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              {questions[currentQuestionIndex].question}
            </h3>

            {/* ✅ Option Boxes */}
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 border-2 rounded-lg text-center font-semibold cursor-pointer transition ${
                    selectedOption === option
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>

            {/* ✅ Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  currentQuestionIndex > 0
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                }`}
                disabled={currentQuestionIndex === 0}
              >
                Back
              </button>

              {currentQuestionIndex + 1 < questions.length ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 font-semibold text-white transition bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Level1;

