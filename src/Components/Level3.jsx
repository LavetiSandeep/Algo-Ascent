
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level3 = () => {
  const handleCopy = (event) => {
    event.preventDefault();
    alert("Copying is not allowed!");
  };
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [selectedTab, setSelectedTab] = useState("editor"); // "editor", "testcases", "result"
  const [score, setScore] = useState(0);
  const [compileWithInput, setCompileWithInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState(0);
  const [fail, setFail] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds

 
  

  // Test cases
  const testCases = [
    { id: 1, input: "12345", expectedOutput: "54321" },
    { id: 2, input: "1000", expectedOutput: "1" },
    { id: 3, input: "20002", expectedOutput: "20002"},
    { id: 4, input: "908070", expectedOutput: "70809" },
    
    { id: 5, input: "7", expectedOutput: "7"},
    { id: 6, input: "5050", expectedOutput: "505"},
    { id: 7, input: "9999", expectedOutput: "9999"},



  ];

  // Compile Code (Run with input)
  const handleCompile = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://qx1z1bgv-5000.inc1.devtunnels.ms/compilecode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, input:10, inputRadio:compileWithInput, lang: "C" }),

      });  


      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json(); 

      setOutput(data.output || "No output received.");
      setSelectedTab("result");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      console.error("Compilation error:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/thankyou"); // Redirect when time runs out
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft, navigate]);

/*timer*/
  useEffect(() => {
    const startTime = new Date("2025/03/11 10:40:00").getTime()+1500000;
    
    const updateTimer = () => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(25 * 60 - elapsedTime, 0);
      setTimeLeft(remainingTime);
    };
  
    updateTimer(); // Initial call to sync immediately
    const timerInterval = setInterval(updateTimer, 1000);
  
    return () => clearInterval(timerInterval); // Cleanup interval on unmount
  }, []);
  

  // Submit Code (Check Test Cases)
  const handleSubmitCode = async () => {
    setLoading(true); // Start loading state
    try {
      const email = localStorage.getItem("email"); // Retrieve email from session storage
    
      const response = await fetch("https://qx1z1bgv-5000.inc1.devtunnels.ms/submitcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, testCases, lang: "C", email }), // Include email
      });
  
      // console.log("Response status:", response.status); // Debugging
  
      // if (!response.ok) {
      //   throw new Error(`Server returned an error: ${response.status}`);
      // }
  
      const data = await response.json();
      console.log("Server response:", data); // Log full response
  
      if (data.message === "Success") {
        navigate("/thankyou");
        console.log("Test Case Results:", data.nopass, "passed, ", data.nofail, "failed");
        alert("All test cases passed!");
        setScore(data.score);
        setPass(data.nopass);
        setFail(data.nofail);
        
      } else {
        console.log("Test Case Results:", data.nopass, "passed, ", data.nofail, "failed");
        alert(`Some test cases failed. Passed: ${data.nopass}, Failed: ${data.nofail}`);
        setFail(data.nofail);
        setPass(data.nopass);


      }
  
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting code. Check console for details.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };
  
  const email = localStorage.getItem("email");  // Get email from session storage

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch(`https://backend-jofi.onrender.com/getLevel3Score?email=${email}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();
        console.log("Mydata",data);
        
        if (response.ok) {
          setScore(data.level3Score);
          setCode(data.code); 
          setFail(data.fail);
          setPass(data.pass);

        } else {
          console.error("Error fetching score:", data.error);
        }
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };

    if (email) fetchScore(); // Only fetch if email is available
  }, [email]);

  const handleCodeChange = async (newCode) => {
    setCode(newCode); // Update local state
  
    const email = localStorage.getItem("email"); // Fetch email from local storage
    if (!email) {
      console.error("No email found in local storage.");
      return;
    }

  
    try {
      const response = await fetch("https://backend-jofi.onrender.com/updateCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          submittedCode: newCode,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Code updated successfully", result);
      } else {
        console.error("Error updating code:", result.message);
      }
    } catch (error) {
      console.error("Failed to update code:", error);
    }
  };
  
  return (
    <div className="min-h-screen p-6 text-white bg-gray-900"onCopy={handleCopy}>
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400">Level 3 - Online IDE</h1>
        <p className="mt-3 text-lg text-gray-300">
          Given a number N, reverse its digits and print it without leading zeros using C.
        </p>
      </header>

      <div className="flex justify-center mb-6 space-x-4"onCopy={handleCopy}>
        {["editor", "testcases", "result"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-md 
            ${selectedTab === tab ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {selectedTab === "editor" && (
        <div className="space-y-4" onCopy={handleCopy}>
          <textarea
            className="w-full h-64 p-4 text-black bg-gray-100 rounded-lg shadow-md"
            placeholder="Write your C code here..."
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
          />

          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={compileWithInput} onChange={(e) => setCompileWithInput(e.target.checked)} />
            <span>Compile with Input</span>
          </label>

          <div className="flex space-x-4"onCopy={handleCopy}>
            <button
              onClick={handleCompile}
              className="px-6 py-3 transition-all bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleSubmitCode}
              className="px-6 py-3 transition-all bg-red-600 rounded-lg shadow-lg hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Code"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 text-lg font-semibold text-green-400"onCopy={handleCopy}>Passed Test Cases: {pass}</div>
      <div className="text-lg font-semibold text-red-400"onCopy={handleCopy}>Failed Test Cases: {fail}</div>

      {selectedTab === "testcases" && (
        <div className="mt-6"onCopy={handleCopy}>
          <h2 className="mb-3 text-2xl font-bold">Test Cases</h2>
          {testCases.slice(0, 3).map((testCase) => {
            const result = testResults.find((r) => r.id === testCase.id);
            return (
              <div key={testCase.id} className="p-4 mb-3 bg-gray-800 rounded-lg shadow-md"onCopy={handleCopy}>
                <p><strong>Input:</strong> {testCase.input}</p>
                <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
                {result && (
                  <p>
                    <strong>Status:</strong>
                    {result.passed ? (
                      <span className="ml-2 text-green-400">Passed (Score: {result.score})</span>
                    ) : (
                      <span className="ml-2 text-red-400">Failed (Score: {result.score})</span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="absolute text-xl font-bold text-red-500 top-6 right-6"onCopy={handleCopy}>
        {timeLeft > 0 ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}` : "Time's up!"}
      </div>

      {selectedTab === "result" && (
        <div className="mt-6"onCopy={handleCopy}>
          <h2 className="mb-3 text-2xl font-bold">Output</h2>
          <pre className="p-4 whitespace-pre-wrap bg-gray-800 rounded-lg shadow-md">{output}</pre>
          <h3 className="mt-4 text-xl font-semibold">Score: {score}</h3>
        </div>
      )}
    </div>
    );
};

export default Level3;
