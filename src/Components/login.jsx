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
  

//   return (
//     <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
//       {/* Animated Background */}
//       <div 
//       className="flex flex-col items-center justify-center h-screen bg-center bg-cover" 
//       style={{ backgroundImage: "url('/login.jpg')" }}
//     >
//       </div>
      
//       {/* Login Form */}
//       <div className="relative z-10 p-8 bg-white rounded-lg shadow-md w-96 backdrop-blur-md">
//         <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">
//           Login
//         </h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {error && <p className="text-sm text-red-500">{error}</p>}
//           <button
//             type="submit"
//             className="w-full p-3 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>

//       <style>
//         {`
//           .neon-glow {
//             text-shadow: 0px 0px 8px rgba(0, 191, 255, 0.9), 0px 0px 16px rgba(0, 191, 255, 0.7);
//           }
//           .neon-border {
//             box-shadow: 0px 0px 15px rgba(0, 191, 255, 0.7);
//           }
//         `}
//       </style>
//     </div>
//   );
// };

return (
  <div 
    className="flex flex-col items-center justify-center h-screen bg-center bg-cover" 
    style={{ backgroundImage: "url('/login.jpg')" }}
  >
    {/* Login Heading Outside the Container */}
<h2 className="mb-6 text-5xl font-bold text-white drop-shadow-lg neon-glow">
LOGIN
</h2>
{/* Glassy Transparent Form Container with Neon Glow */}
<div className="p-12 border rounded-lg shadow-lg w-96 bg-white/10 backdrop-blur-md border-white-500/80 neon-border">
<form onSubmit={handleLogin} className="space-y-4">
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full p-3 text-white placeholder-gray-300 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full p-3 text-white placeholder-gray-300 bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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


    {/* Neon Glow Effect Styling */}
    <style>
      {`
        .neon-glow {
          text-shadow: 0px 0px 8px rgba(0, 191, 255, 0.9), 0px 0px 16px rgba(0, 191, 255, 0.7);
        }
        .neon-border {
          box-shadow: 0px 0px 15px rgba(0, 191, 255, 0.7);
        }
      `}
    </style>
  </div>
);
}

export default LoginPage;
