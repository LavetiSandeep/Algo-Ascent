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
      { 
        id: 1, 
        text: (
          <div>
            <p>Consider the following C program:</p>
            <pre>
    {`#include <stdio.h>
 int main()
    {
      int a[] = {2, 4, 6, 8, 10};
      int i, sum = 0, *b = a + 4;
      for (i = 0; i < 5; i++)
        sum = sum + (*b - i) - *(b - i);
      printf("%d\\n", sum);
      return 0;
    }`}
            </pre>
            <p>What will be the output of the program?</p>
          </div>
        ),
        answer: "0", 
        marks: 10 
      },
      { id: 2, 
        text: (
          <div>
            <p>Consider the following C program:</p>
            <pre></pre>
            <pre>
    {`#include <stdio.h>
 
int main() 
 {
    int n = 5,i,j,k,num = 1;
    for(i = 0;i < n;i++)
    {for(j = 0;j < n-i;j++){
    printf("%d",num++);
    }
    for(k=0;k < i;k++){
    num--;}
    printf("\\n");

    
    }

    return 0;
 }
}`}
            </pre>
            <p>What will be the output of the program?</p>
          </div>
        ),
        answer: "1 2 3 4 5\n6 7 8 9\n9 10 11\n10 11\n9", 
        marks: 10 
      },
      { id: 3, 
        text: (
          <div>
            <p>Consider the following C program:</p>
            <pre></pre>
            <pre>
    {`#include <stdio.h>
 void fun(int *p) 
  {
    *p = (*p) * 2;
  }
 int main() 
  {
    int x = 5;
    fun(&x);
    printf("%d\\n", x);
    return 0;
  }`}
            </pre>
            <p>What will be the output of the program?</p>
          </div>
        ),
        answer: "10", 
        marks: 10 
      },
      { id: 4, 
        text: (
          <div>
            <p>Consider the following C program:</p>
            <pre></pre>
            <pre>
    {`#include <stdio.h>
   int main() 
   {int n=5,i,j;
   for(i = 1; i <= n;i++){
   for()}
    ;
}`}
            </pre>
            <p>What will be the output of the program?</p>
          </div>
        ),
        answer: "Hallo", 
        marks: 10 
      },
      { id: 5, 
        text: (
          <div>
            <p>Consider the following C program:</p>
            <pre></pre>
            <pre>
    {`#include <stdio.h>
 int main() 
{
    int a = 5, b = 10, c = 0;
    c = a > b ? a++ : b++;
    printf("%d %d %d\\n", a, b, c);
    return 0;
}`}
            </pre>
            <p>What will be the output of the program?</p>
          </div>
        ),
        answer: "10", 
        marks: 10 
      },
      { id: 6, 
        text: (
          <div>
            <p>Consider the following C program:</p>
            <pre></pre>
            <pre>
    {`#include <stdio.h>
    int main() 
    {
       char ch = 'x';
       printf("%c %d\\n", ch, ch);
       return 0;
    }`}
            </pre>
            <p>What will be the output of the program?</p>
          </div>
        ),
        answer: "x,120", 
        marks: 10 
      }
    ];
    
    
    setQuestions(customQuestions);
  }, []);

  useEffect(() => {
    const quizDuration = 1 * 60 * 1000; // 20 minutes in milliseconds
    let startTime = localStorage.getItem("startTime");

    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem("quizStartTime", startTime);
    }

    const updateTimer = () => {
      const startTime = new Date("2025/03/10 12:46:00");
      const elapsedTime = Date.now() - startTime;

      const newTimeLeft = Math.max(
        Math.floor((quizDuration - elapsedTime) / 1000),
        0
      );

      const minutes = Math.floor(newTimeLeft / 60);
      const seconds = newTimeLeft % 60;

      setTimeLeft(newTimeLeft);

      if (newTimeLeft === 0) {
        navigate("/waitingpg2");
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
    console.log("score", score);

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
    if (
      currentAnswer === correctAnswer &&
      !answeredCorrectly[currentQuestion]
    ) {
      updatedScore += currentQ.marks;
      setAnsweredCorrectly((prev) => ({ ...prev, [currentQuestion]: true }));
    }
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("No email found in localStorage");
      return;
    }
    try {
      const response = await axios.post(
        "https://backend-jofi.onrender.com/api/update-level2score",
        {
          email,
          level2Score: updatedScore,
        }
      );
      console.log("Level 2 score updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating level2 score:", error);
    }
    // Update the state (asynchronously) and use updatedScore for submission
    setScore(updatedScore);
    const finalScore = level1Score + updatedScore;

    setSubmitted(true);

    localStorage.setItem("finalScore", finalScore);
    navigate("/waitingpg2");
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-4 text-white bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/lvl2.jpg')" }} // Add your image path here
    >
      {/* ALGO ASCENT - Centered at the Top */}
      <h1 className="absolute text-5xl font-bold text-transparent transform -translate-x-1/2 top-6 left-1/2 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        ALGO ASCENT
      </h1>

      {/* LEVEL-2 - Positioned Closer Beneath */}
      <h2 className="mt-1 text-3xl font-semibold text-yellow-300">LEVEL-2</h2>
      {/* Timer (Top Right) */}
      <div className="absolute text-3xl font-bold text-red-400 top-4 right-6">
        ⏳ {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </div>

      {questions.length > 0 ? (
        <>
          {/* Question Container */}
          <div
            className="w-full max-w-5xl p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl 
                border-[3px] border-pink-400/50 hover:border-pink-400 shadow-pink-500 transition-all"
          >
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
