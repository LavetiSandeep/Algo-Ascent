import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level1 = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0); // Start fresh
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // 20 minutes countdown
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreUpdatedQuestions, setScoreUpdatedQuestions] = useState({});
  // const [isManual, setIsManual] = useState(false);


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
      question: "what happens if free() is called on a NULL pointer?",
      options: ["segmentation fault", "undefined behavior", "it does nothing", "it resets the pointer to 0"],
      correctAnswer: "it does nothing",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },    
    {
      question: "Which data structure is best suited for implementing recursion?",
      options: ["Queue", "Stack", "Array", "Graph"],
      correctAnswer: "Stack",
    },
    {
      question: "which of the following devices can function as both an input and output ?",
      options: ["Monitor", "Printer", "Touchscreen", "Keyboard"],
      correctAnswer: "Touchscreen",
    },
    {
      question: "What will be the output of sizeof(5.0) in C?",
      options:["2", "4", "8", "16"],
      correctAnswer: "8",
    },
    {
      question: "Which type of RAM retains data even when power is turned off?",
      options: ["DRAM", "SRAM", "ROM", "Both DRAM and SRAM"],
      correctAnswer: "ROM",
    },   
    {
      question: "Which of the following is the correct way to initialize an array?",
      options: ["int arr[] = {1, 2, 3, 4};", "int arr(4) = {1, 2, 3, 4};", "int arr = {1, 2, 3, 4};", "int arr[] = (1, 2, 3, 4);"],
      correctAnswer: "int arr[] = {1, 2, 3, 4};",
    },
    {
      question: "What will be the output of printf(\"%d\", 'A'); in C?",
      options: ["A", "65", "Compilation Error", "Garbage Value"],
      correctAnswer: "65",
    },
    {
      question: "Which type of memory is directly accessed by a CPU for imediate processing?",
      options: ["HDD", "RAM", "Cache", "SSD"],
      correctAnswer: "Cache",
    },
    {
      question: "What is the full form of URL?",
      options: ["Uniform Resource Link", "Unified Reference Locator", "Uniform Resource Locator", "Universal Resource Link"],
      correctAnswer: "Uniform Resource Locator",
    },
    {
    question: "which storagedevice is used for long-term data storage?",
      options: ["Ram", "Hard Drive", "Cache", "Register"],
      correctAnswer: "Hard Drive",
    },
    {
      question: "Which function is used to take input in C?",
        options: ["input()", "scanf()", "get()", "cin"],
        correctAnswer: "scanf()",
    },
    {
      question: "Which header file is needed for memory allocation functions like malloc() and free()?",
      options: [" stdio.h", "stdlib.h", "memory.h", " conio.h"],
      correctAnswer: "stdlib.h",
    },
  ];

///this will has to be update

  // Added useEffect to implement the countdown timer.
  // It decreases 'timeLeft' every second and auto-submits when time runs out.
  

  

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
  // setIsSubmitted(true);
  // localStorage.setItem("level1Submitted", "true");

  // Delay navigation to Level2 by 5 seconds, and replace history so user cannot go back
  // setTimeout(() => {
  //   navigate("/level2", { state: { level1Score: finalScore }, replace: true });
  // }, 1000);


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

    // TO SAVE SCORE IN LOCALSTORAGE
    localStorage.setItem("finalscore", finalScore);
    
    //navigate("/level2", { state: { level1Score: finalScore } });
    
     // 🟢 **If user submitted before time, go to waiting page first**
    navigate("/waitingpg1", { state: { level1Score: finalScore } });
  //   setTimeout(() => {
  //     navigate("/level2", { state: { level1Score: finalScore }, replace: true });
  //   }); // 5-second delay before going to Level 2
  // } else {
  //   navigate("/level2", { state: { level1Score: finalScore }, replace: true });
  // }
 
 console.log("shdsjs",timeLeft); // remove in future
  };
  useEffect(() => {
    const quizDuration = 3 * 60 * 1000 ; // 20 minutes in milliseconds
    let startTime = localStorage.getItem("quizstartTime");
  
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem("quizStartTime", startTime);
    }
  
    const updateTimer = () => {
      const startTime = new Date("2025/03/10 10:56:00");
      const elapsedTime = Date.now() - startTime;
      const newTimeLeft = Math.max(Math.floor((quizDuration - elapsedTime) / 1000), 0);
      
      setTimeLeft(newTimeLeft);
  
      if (newTimeLeft === 0) {
       //navigate("/level2");
         handleSubmit(false); // Auto-submit when timer reaches 0
      }
    };
  
    updateTimer(); // Initial update
    const timerInterval = setInterval(updateTimer, 1000);
  
    return () => clearInterval(timerInterval);
  }, []);
  
  
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

            // change this
            <button
  onClick={ () => {handleSubmit(true);} }// Pass `true` to indicate manual submission
  disabled={isSubmitted || timeLeft === 0} // Prevents multiple submissions
  className={`px-5 py-2 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600 ${
    isSubmitted ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  Submit
</button>

          )}
        </div>
      </div>

      
    </div>
    
  );

};

export default Level1;