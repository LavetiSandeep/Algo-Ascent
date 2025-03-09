// import React from "react";

// useEffect(() => {
//     const quizDuration = 10 * 60 * 1000 ; // 20 minutes in milliseconds
//     let startTime = localStorage.getItem("quizstartTime");
  
//     if (!startTime) {
//       startTime = Date.now();
//       localStorage.setItem("quizStartTime", startTime);
//     }
  
//     const updateTimer = () => {
//       const startTime = new Date("2025/03/09 21:30:00");
//       const elapsedTime = Date.now() - startTime;
//       const newTimeLeft = Math.max(Math.floor((quizDuration - elapsedTime) / 1000), 0);};
//     }

// const WaitingPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
//         <h1 className="text-3xl font-bold text-green-600">🎉 Congratulations! 🎉</h1>
//         <p className="text-lg mt-4 text-gray-700">
//           Your Level 1 score has been successfully submitted.
//         </p>
//         <div className="mt-6 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
//         </div>
//         <p className="text-gray-500 mt-2">Please wait for the next round...</p>
//       </div>
//     </div>
//   );
// };
// )


// export default WaitingPage;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WaitingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const quizDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
    let startTime = localStorage.getItem("quizStartTime");

    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem("quizStartTime", startTime);
    } else {
      startTime = parseInt(startTime, 10);
    }

    const updateTimer = () => {
      const elapsedTime = Date.now() - startTime;
      const timeLeft = quizDuration - elapsedTime;

      if (timeLeft <= 0) {
        navigate("/level2"); // Redirect to Level 2 when time is up
      }
    };

    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval); // Cleanup
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <h1 className="text-3xl font-bold text-green-600">🎉 Congratulations! 🎉</h1>
        <p className="text-lg mt-4 text-gray-700">
          Your Level 1 score has been successfully submitted.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
        <p className="text-gray-500 mt-2">Please wait for the next round...</p>
      </div>
    </div>
  );
};

export default WaitingPage;

