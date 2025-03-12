import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const WaitingPage2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level2Score = location.state?.level2Score || 0;

  // Set your predefined synchronized time here
  const simulatedStartTime = new Date("2025/03/12 15:15:00").getTime()+1500000;
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remainingTime = Math.max((simulatedStartTime - now) / 1000, 0);
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        // clearInterval(timerInterval);
        navigate("/score", { state: { level2Score }, replace: true });
      }
    };

    updateTimer(); // Initial update
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [navigate, level2Score]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-gray-900">
      <h1 className="mb-4 text-4xl font-bold text-yellow-400">
        Waiting for Score Calculation
      </h1>
      <p className="text-lg">Level 3 will start soon...</p>
      <p className="mt-2 text-2xl font-semibold text-red-500">
        Time Remaining: {Math.floor(timeLeft / 60)}:
        {String(Math.floor(timeLeft % 60)).padStart(2, "0")}
      </p>
    </div>
  );
};

export default WaitingPage2;
