// // 


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const WaitingPage = () => {
//   const navigate = useNavigate();
  
//   // Set the predefined real-time start time
//   const simulatedStartTime = new Date("2025/03/11 00:08:00").getTime(); 
//   const waitingDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
//   const endTime = simulatedStartTime + waitingDuration; // When the waiting period ends

//   const [timeLeft, setTimeLeft] = useState(() => {
//     return Math.max(Math.floor((endTime - Date.now()) / 1000), 0);
//   });

//   useEffect(() => {
//     const updateTimer = () => {
//       const remainingTime = Math.max(Math.floor((endTime - Date.now()) / 1000), 0);
//       setTimeLeft(remainingTime);

//       if (remainingTime === 0) {
//         navigate("/level2"); // Redirect when time is up
//       }
//     };

//     updateTimer(); // Initial call to set the timer
//     const interval = setInterval(updateTimer, 1000); // Update every second

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [navigate, endTime]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="p-6 text-center bg-white shadow-lg rounded-2xl">
//         <h1 className="text-3xl font-bold text-green-600">🎉 Congratulations! 🎉</h1>
//         <p className="mt-4 text-lg text-gray-700">
//           Your Level 1 score has been successfully submitted.
//         </p>

//         {/* Timer Display */}
//         <div className="mt-4 text-2xl font-bold text-red-500">
//           ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
//         </div>

//         <div className="flex items-center justify-center mt-6">
//           <div className="w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin"></div>
//         </div>

//         <p className="mt-2 text-gray-500">Please wait for the next round...</p>
//       </div>
//     </div>
//   );
// };

// export default WaitingPage;


import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const WaitingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level1Score = location.state?.level1Score || 0;

  // Set your predefined synchronized time here
  const simulatedStartTime = new Date("2025/03/11 13:22:00").getTime()+600000;
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remainingTime = Math.max((simulatedStartTime - now) / 1000, 0);
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        // clearInterval(timerInterval);
        console.log("hello")
        navigate("/level2", { state: { level1Score }, replace: true });
      }
    };

    updateTimer(); // Initial update
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [navigate, level1Score]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-gray-900">
      <h1 className="mb-4 text-4xl font-bold text-yellow-400">Waiting for Level 2</h1>
      <p className="text-lg">Level 2 will start soon...</p>
      <p className="mt-2 text-2xl font-semibold text-red-500">
        Time Remaining: {Math.floor(timeLeft / 60)}:{String(Math.floor(timeLeft % 60)).padStart(2, "0")}
      </p>
    </div>
  );
};

export default WaitingPage;
