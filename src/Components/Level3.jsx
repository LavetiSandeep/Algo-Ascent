/*import React, { useState } from "react";

const Level3 = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [compileWithInput, setCompileWithInput] = useState(false);

  const handleCompile = async () => {
    try {
      const response = await fetch("http://localhost:5000/compilecode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code: code,
          input: input,
          inputRadio: compileWithInput ? "true" : "false",
          lang: "C"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput("Error in compilation: " + error.message);
      console.error("Compilation error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Online IDE - Level 3</h2>
      <textarea
        rows="10"
        cols="50"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your C code here..."
        style={{ display: "block", marginBottom: "10px" }}
      />
      <textarea
        rows="5"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Input (if needed)"
        style={{ display: "block", marginBottom: "10px" }}
      />
      <label style={{ display: "block", marginBottom: "10px" }}>
        Compile with Input:
        <input
          type="checkbox"
          checked={compileWithInput}
          onChange={(e) => setCompileWithInput(e.target.checked)}
          style={{ marginLeft: "5px" }}
        />
      </label>
      <button onClick={handleCompile} style={{ marginBottom: "10px" }}>
        Run Code
      </button>
      <h3>Output:</h3>
      <pre
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "5px",
          minHeight: "50px",
        }}
      >
        {output}
      </pre>
    </div>
  );
};

export default Level3;

*/

/*import React, { useState } from "react";

const Level3 = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [selectedTab, setSelectedTab] = useState("editor"); // "editor", "testcases", "result"
  const [score, setScore] = useState(0);
  const [compileWithInput, setCompileWithInput] = useState(false);

  // Dummy test cases for demonstration
  const testCases = [
    { id: 1, input: "1 2", expectedOutput: "3" },
    { id: 2, input: "2 3", expectedOutput: "5" },
    { id: 3, input: "10 20", expectedOutput: "30" },
  ];

  // Function to compile the code
  const handleCompile = async () => {
    try {
      const response = await fetch("http://localhost:5000/compilecode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code: code,
          inputRadio: compileWithInput ? "true" : "false",
          lang: "C"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.output);
      setSelectedTab("result");
    } catch (error) {
      setOutput("Error in compilation: " + error.message);
      console.error("Compilation error:", error);
    }
  };

  // Simulate submitting code against test cases
  const handleSubmitCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/compilecode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code: code,
          testCases: testCases,
          lang: "C",
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();

      if (!data.outputs || !Array.isArray(data.outputs)) {
        throw new Error("Invalid response from backend. 'outputs' is missing or not an array.");
      }
  
      let passedCount = 0;
      const results = testCases.map((testCase, index) => {
        const actualOutput = data.outputs[index]; // Get actual output from backend
        const passed = actualOutput.trim() === testCase.expectedOutput.trim();
  
        if (passed) passedCount++;
  
        return {
          id: testCase.id,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          output: actualOutput,
          passed,
        };
      });
  
      setTestResults(results);
      setScore(passedCount * 10);
      setOutput(`Passed ${passedCount} out of ${testCases.length} test cases.`);
      setSelectedTab("result");
    } catch (error) {
      setOutput("Error in submission: " + error.message);
      console.error("Submission error:", error);
    }
  };
  

  return (
    <div className="min-h-screen p-4 text-white bg-gray-800">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Level 3 - Online IDE</h1>
        <p className="mt-2">Solve the problem using C language. Test your solution with custom test cases.</p>
      </header>

      {/* Tabs /}
      <div className="flex mb-4 space-x-4">
        <button onClick={() => setSelectedTab("editor")} className={`px-4 py-2 rounded ${selectedTab === "editor" ? "bg-blue-600" : "bg-gray-600"}`}>Editor</button>
        <button onClick={() => setSelectedTab("testcases")} className={`px-4 py-2 rounded ${selectedTab === "testcases" ? "bg-blue-600" : "bg-gray-600"}`}>Test Cases</button>
        <button onClick={() => setSelectedTab("result")} className={`px-4 py-2 rounded ${selectedTab === "result" ? "bg-blue-600" : "bg-gray-600"}`}>Result</button>
      </div>

      {selectedTab === "editor" && (
        <div>
          <textarea className="w-full h-64 p-2 text-black rounded" placeholder="Write your C code here..." value={code} onChange={(e) => setCode(e.target.value)} />
          <label className="block mt-2">
            Compile with Input:
            <input type="checkbox" checked={compileWithInput} onChange={(e) => setCompileWithInput(e.target.checked)} className="ml-2" />
          </label>
          <div className="mt-2 space-x-2">
            <button onClick={handleCompile} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Run Code</button>
            <button onClick={handleSubmitCode} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Submit Code</button>
          </div>
        </div>
      )}

      {selectedTab === "testcases" && (
        <div className="mt-4">
          <h2 className="mb-2 text-2xl font-semibold">Test Cases</h2>
          {testCases.map((testCase) => (
            <div key={testCase.id} className="p-2 mb-2 border border-gray-600 rounded">
              <p><strong>Input:</strong> {testCase.input}</p>
              <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
              {testResults.length > 0 && (
                <p><strong>Status:</strong> {testResults.find((r) => r.id === testCase.id)?.passed ? <span className="text-green-400">Passed</span> : <span className="text-red-400">Failed</span>}</p>
              )}
            </div>
          ))}
        </div>
      )}

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

*/

import React, { useState } from "react";

const Level3 = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [selectedTab, setSelectedTab] = useState("editor"); // "editor", "testcases", "result"
  const [score, setScore] = useState(0);
  const [compileWithInput, setCompileWithInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState(0);
  const [fail, setFail] = useState(0);

  // Test cases
  const testCases = [
    { id: 1, input: "1", expectedOutput: "2" },
    { id: 2, input: "2", expectedOutput: "4" },
    { id: 3, input: "4", expectedOutput: "8" },
    { id: 4, input: "5", expectedOutput: "10"},
  ];

  // Compile Code (Run with input)
  const handleCompile = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/compilecode", {
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

  // Submit Code (Check Test Cases)
  const handleSubmitCode = async () => {
    setLoading(true); // Start loading state
    try {
      const response = await fetch("http://localhost:5000/submitcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, testCases, lang: "C" }),
      });
  
      // console.log("Response status:", response.status); // Debugging
  
      // if (!response.ok) {
      //   throw new Error(`Server returned an error: ${response.status}`);
      // }
  
      const data = await response.json();
      console.log("Server response:", data); // Log full response
  
      if (data.message === "Success") {
        console.log("Test Case Results:", data.nopass, "passed, ", data.nofail, "failed");
        alert("All test cases passed!");
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
  

  return (
    <div className="min-h-screen p-4 text-white bg-gray-800">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Level 3 - Online IDE</h1>
        <p className="mt-2">Solve the problem using C language. Test your solution with custom test cases.</p>
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
            onChange={(e) => setCode(e.target.value)}
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
    {testCases.slice(0, 2).map((testCase) => {
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
