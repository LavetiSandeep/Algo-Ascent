import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level1 = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0); // Start fresh
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 ); // 20 minutes countdown
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "None of the above"], correctAnswer: "HyperText Markup Language" },
    { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Linked List", "Array"], correctAnswer: "Stack" },
    { question: "Which language is mainly used for Android development?", options: ["Java", "Python", "C#", "Swift"], correctAnswer: "Java" },
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctAnswer: "O(log n)" },
    { question: "Which protocol is used for secure communication over the internet?", options: ["HTTP", "FTP", "SSH", "HTTPS"], correctAnswer: "HTTPS" },
  ];

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // Auto-submit when time expires
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };


  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    }

    localStorage.setItem("level1Score", score); // Save Level 1 score
    setIsSubmitted(true);
    navigate("/level2", { state: { level1Score: score } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">Level 1</h2>
      <p className="mb-2 text-lg font-semibold text-red-500">
        Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </p>

      {isSubmitted ? (
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-green-600">Your Score: {score}</h3>
          <p className="text-lg text-gray-600">Wait for the timer to finish...</p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              {questions[currentQuestionIndex].question}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 border-2 rounded-lg text-center font-semibold cursor-pointer transition ${
                    selectedOption === option ? "bg-blue-500 text-white border-blue-500" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>

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
