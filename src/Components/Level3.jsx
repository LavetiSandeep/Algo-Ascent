
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Level3 = () => {

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
      const response = await fetch("https://backend-jofi.onrender.com/compilecode", {
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
    const startTime = new Date("2025/03/11 02:15:00").getTime()+1500000;
    
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
    
      const response = await fetch("https://backend-jofi.onrender.com/submitcode", {
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
    <div className="min-h-screen p-4 text-white bg-gray-800">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Level 3 - Online IDE</h1>
        <p className="mt-2">Given a number N, reverse its digits and print it without leading zeros using C language. Test your solution with custom test cases.</p>
      </header>

      {/* Tabs */}
      <div className="flex mb-4 space-x-4">
        {["editor", "testcases", "result"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded ${selectedTab === tab ? "bg-blue-600" : "bg-gray-600"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {selectedTab === "editor" && (
        <div>
         <textarea
  className="w-full h-64 p-2 text-black rounded"
  placeholder="Write your C code here..."
  value={code}
  onChange={(e) => handleCodeChange(e.target.value)}
/>

          <label className="block mt-2">
            Compile with Input:
            <input type="checkbox" checked={compileWithInput} onChange={(e) => setCompileWithInput(e.target.checked)} className="ml-2" />
          </label> 
          <div className="mt-2 space-x-2">
            <button
              onClick={handleCompile}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleSubmitCode}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Code"}
            </button>
          </div>
        </div>
      )}
      <div>passed testcases : {pass}</div>
      <div>failed testcases : {fail}</div>

      {selectedTab === "testcases" && (
  <div className="mt-4">
    <h2 className="mb-2 text-2xl font-semibold">Test Cases</h2>
    {testCases.slice(0, 3).map((testCase) => {
     // Find corresponding test result using the testCase id
      const result = testResults.find((r) => r.id === testCase.id);
      return (
        <div key={testCase.id} className="p-2 mb-2 border border-gray-600 rounded">
          <p><strong>Input:</strong> {testCase.input}</p>
          <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
          {result && (
            <p>
              <strong>Status:</strong> 
              {result.passed ? 
                <span className="text-green-400">
                  Passed (Score: {result.score})
                </span> : 
                <span className="text-red-400">
                  Failed (Score: {result.score})
                </span>
              }
            </p>
          )}
        </div>
      );
    })}
  </div>
)}

<div className="absolute text-xl font-bold text-red-500 top-4 right-4">
  {timeLeft > 0 ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}` : "Time's up!"}
</div>


      {selectedTab === "result" && (
        <div className="mt-4">
          <h2 className="mb-2 text-2xl font-semibold">Output</h2>
          <pre className="p-4 whitespace-pre-wrap bg-gray-700 rounded">{output}</pre>
          <h3 className="mt-4 text-xl">Score: {score}</h3>
        </div>
      )}
    </div>
  );
};

export default Level3;
