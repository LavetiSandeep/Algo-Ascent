import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level1 = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0); // Start fresh
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 20 minutes countdown
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreUpdatedQuestions, setScoreUpdatedQuestions] = useState({});

  const questions = [
    {
      question: "Which Storage device has the fastest data access speed?",
      options: [
        "Hard Disk",
        "SSD",
        "CD-ROM",
        "Floppy Disk",
      ],
      correctAnswer: "SSD",
    },
    {
      question: "Which loop always executes at least once?",
      options: ["For loop", "While", "Do-While", "if statement"],
      correctAnswer: "Do-While",
    },


    {
      question: "Which of the following cannot be a variable name in C?",
      options: ["volatile", "true", "friend", "export"],
      correctAnswer: "volatile",
    },
    {
      question: "#include <stdio.h> \n int main() { \n char ch = 'A' + 2; \n printf(\"%c\", ch); \n return 0; \n }",
      options: ["A", "B", "C", "D"],
      correctAnswer: "C",
    },    
    {
      question: "Which type of software acts as an interface between hardware and user applications?",
      options: ["Application Software", "System Software", "Firmware", "Middleware"],
      correctAnswer: "System Software",
    },
    {
      question: "Which number system is used in IP addressing?",
      options: ["Decimal", "Binary", "Octal", "Hexadecimal"],
      correctAnswer: "Binary",
    },
    {
      question: "What will be the output of sizeof(5.0) in C?",
      options:["2", "4", "8", "16"],
      correctAnswer: "8",
    },
    {
      question: "int x = 2; x = x << 2; printf(\"%d\", x);",
      options: ["4", "8", "16", "2"],
      correctAnswer: "8",
    },   
    {
      question: "Which language is mainly used for Android development?",
      options: ["Java", "Python", "C#", "Swift"],
      correctAnswer: "Java",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: "O(log n)",
    },
    {
      question: "Which of the following is not possible statically in C language?",
      options: ["Jagged Array", "Rectangular Array", "Cuboidal Array", "Multidimensional Array"],
      correctAnswer: "Jagged Array",
    },
    {
      question: "",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: "O(log n)",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: "O(log n)",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: "O(log n)",
    },
  ];

///this will has to be update




  // Added useEffect to implement the countdown timer.
  // It decreases 'timeLeft' every second and auto-submits when time runs out.
  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      // Auto-submit when timer reaches zero.
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  

  const handleOptionClick = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    const option = selectedOptions[currentQuestionIndex]?.trim();
    const correctAnswer = questions[currentQuestionIndex].correctAnswer.trim();

    console.log(score);  // this has to be removed in future


    if (option === correctAnswer && !scoreUpdatedQuestions[currentQuestionIndex]) {
      setScore((prevScore) => prevScore + 10);
      setScoreUpdatedQuestions((prev) => ({
        ...prev,
        [currentQuestionIndex]: true,
      }));
    } else if (option !== correctAnswer && scoreUpdatedQuestions[currentQuestionIndex]) {
      setScore((prevScore) => prevScore - 10);
      setScoreUpdatedQuestions((prev) => ({
        ...prev,
        [currentQuestionIndex]: false,
      }));
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {

     // Prevent re-submission if already submitted
     if (isSubmitted) return; // <-- New check added

     
    let finalScore = score;



    // newly added to redirect back to level2 
     // ... (score calculation and API call)
  setIsSubmitted(true);
  localStorage.setItem("level1Submitted", "true");

  // Delay navigation to Level2 by 5 seconds, and replace history so user cannot go back
  setTimeout(() => {
    navigate("/level2", { state: { level1Score: finalScore }, replace: true });
  }, 1000);


  // useEffect(() => {
  //   // If level1 has been submitted, automatically redirect to level2
  //   const submitted = localStorage.getItem("level1Submitted");
  //   if (submitted === "true") {
  //     navigate("/level2", { replace: true });
  //   }
  // }, [navigate]);



    // Check if the last answered question was correct before submission
    const lastSelectedOption = selectedOptions[currentQuestionIndex];
    if (
      lastSelectedOption === questions[currentQuestionIndex].correctAnswer &&
      !scoreUpdatedQuestions[currentQuestionIndex]
    ) {
      finalScore += 10;
      setScore(finalScore);
    }

    try {
      const email = localStorage.getItem("email");
      if (!email) {
        console.error("No email found in localStorage");
        return;
      }

      const response = await fetch("https://backend-jofi.onrender.com/api/update-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          level1Score: finalScore, // ✅ Use `finalScore` to ensure the latest value is sent
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update score");
      }

      console.log("Score updated successfully:", data);
    } catch (error) {
      console.error("Error updating score:", error);
    }

    setIsSubmitted(true);
    localStorage.setItem("level1Submitted", "true"); // <-- Persist submission state
    
    navigate("/level2", { state: { level1Score: finalScore } });
  };
  
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen p-5 overflow-hidden"
      style={{
        backgroundImage: "url('/lv1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

<div className="text-center">
        <h1 className="p-4 text-5xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
          ALGO ASCENT
        </h1></div>

      {/* Title Section */}
      <div className="text-center">
        <h2 className="mt-2 text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text">
          Level 1
        </h2>
      </div>

      {/* Timer */}
      <div className="absolute p-3 rounded-lg shadow-lg top-5 right-6 bg-white/10 backdrop-blur-md">
        <p className="text-xl font-bold text-red-500">
          Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </p>
      </div>

      {/* Quiz Container */}
      <div className="w-full max-w-3xl min-h-[250px] p-8 bg-white/10 backdrop-blur-lg 
                      rounded-lg shadow-2xl border-[3px] border-blue-400/50 
                      hover:border-blue-400 shadow-blue-500 transition-all mt-5">
        <div className="flex justify-between items-center mb-3 text-[#39ff14] text-lg font-semibold">
          <span>QUESTION: {currentQuestionIndex + 1}/{questions.length}</span>
          <span>Marks: 10</span>
        </div>

        <h3 className="mb-4 text-lg font-semibold text-center text-white">
          {questions[currentQuestionIndex].question}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div
              key={index}
              className={`p-3 border-2 rounded-lg text-center font-semibold cursor-pointer transition ${
                selectedOptions[currentQuestionIndex] === option
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
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
              className="px-5 py-2 font-semibold text-white transition bg-green-500 rounded-lg hover:bg-green-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}

              disabled={isSubmitted} // <-- New attribute added to disable button after first submission
              className="px-5 py-2 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Score Section
      {isSubmitted && (
        <div className="absolute p-3 text-center rounded-lg shadow-lg bottom-10 bg-white/10 backdrop-blur-md">
          <h3 className="text-xl font-semibold text-green-600">Your Score: {score}</h3>
          <p className="text-gray-300 text-md">Wait for the timer to finish...</p>
        </div>
      )} */}
    </div>
    
  );

};

export default Level1;