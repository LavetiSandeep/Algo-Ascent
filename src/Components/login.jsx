import { useState } from "react";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const response = await fetch("https://backend-jofi.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Assuming the backend returns a token or user info
        localStorage.setItem("email", data.email);
        navigate("/home");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[200%] h-[200%] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-wave opacity-50" />
        <div className="absolute w-[180%] h-[180%] bg-gradient-to-r from-purple-500 via-pink-600 to-blue-500 animate-wave-reverse opacity-40" />
      </div>
      
      {/* Login Form */}
      <div className="relative z-10 p-8 bg-white rounded-lg shadow-md w-96 backdrop-blur-md">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
