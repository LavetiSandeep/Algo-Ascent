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
  
    // Fetch immediately, then every 2 seconds
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 2000);
  
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">🏆 Leaderboard 🏆</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-md">
            <thead>
              <tr className="text-white bg-gradient-to-r from-indigo-500 to-purple-500">
                <th className="p-3 text-lg border">Rank</th>
                <th className="p-3 text-lg border">Email</th>
                <th className="p-3 text-lg border">Level 3 Score</th>
                <th className="p-3 text-lg border">Submission Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((user, index) => (
                  <tr
                    key={user.email}
                    className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}
                  >
                    <td className="p-3 font-semibold border">{index + 1}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 font-bold text-green-600 border">
                      {user.level3Score ?? "N/A"}
                    </td>
                    <td className="p-3 text-gray-700 border">
                      {user.level3submissiontime ?? "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No leaderboard data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
