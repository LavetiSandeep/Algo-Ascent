import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("https://backend-jofi.onrender.com/leaderboard");
        const data = await response.json();

        if (response.ok) {
          setLeaderboard(data);
        } else {
          console.error("Error fetching leaderboard:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Leaderboard</h2>
      <table className="w-full mt-4 border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Level 3 Score</th>
            <th className="p-2 border">Level 3 Submission Time</th>
            <th className="p-2 border">Final Score</th>
            <th className="p-2 border">Level 2 Submission Time</th>
            <th className="p-2 border">Level 1 Score (if no final score)</th>
            <th className="p-2 border">Level 1 Submission Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.email} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.level3Score ?? "N/A"}</td>
              <td className="p-2 border">
                {user.level3submissiontime
                  ? user.level3submissiontime
                  : "N/A"}
              </td>
              <td className="p-2 border">{user.finalScore ?? "N/A"}</td>
              <td className="p-2 border">
                {user.level2submissiontime
                  ? user.level2submissiontime
                  : "N/A"}
              </td>
              <td className="p-2 border">{user.level1Score}</td>
              <td className="p-2 border">
                {user.level1submissiontime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
