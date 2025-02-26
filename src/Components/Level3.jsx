import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Level3 = () => {
  const [code, setCode] = useState(`#include <stdio.h>\nint main() {\n  printf("Hello, World!");\n  return 0;\n}`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [testResults, setTestResults] = useState(null);
  const navigate = useNavigate();

  const codingQuestion = {
    id: 1,
    title: "Sum of Two Numbers",
    description: "Write a program that takes two integers as input and prints their sum.",
    testCases: [
      { input: "2 3", expectedOutput: "5" },
      { input: "10 15", expectedOutput: "25" }
    ]
  };

  const handleRunCode = async () => {
    setOutput("");
    setError("");
    setTestResults(null);

    try {
      const response = await axios.post("http://localhost:5000/run", {
        code,
        testCases: codingQuestion.testCases
      });

      setOutput(response.data.output);
      setTestResults(response.data.results);
    } catch (err) {
      setError("Error running the code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white bg-gray-900">
      <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-300">{codingQuestion.title}</h2>
        <p className="mt-2 text-gray-300">{codingQuestion.description}</p>

        <h3 className="mt-4 text-lg font-semibold text-blue-400">Write your C code:</h3>
        <CodeMirror
          value={code}
          height="200px"
          theme="dark"
          options={{ mode: "text/x-csrc", lineNumbers: true }}
          onChange={(value) => setCode(value)}
          className="mt-2 bg-black"
        />

        <button
          onClick={handleRunCode}
          className="px-6 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Run Code 🚀
        </button>

        <h3 className="mt-6 text-lg font-semibold text-yellow-400">Output:</h3>
        <div className="p-3 bg-gray-700 rounded">
          {error ? <p className="text-red-500">{error}</p> : <pre>{output}</pre>}
        </div>

        {testResults && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-blue-400">Test Case Results:</h3>
            {testResults.map((result, index) => (
              <p key={index} className={result.passed ? "text-green-400" : "text-red-500"}>
                {result.passed ? "✅" : "❌"} Test {index + 1}: {result.message}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/score", { state: { level3Score: testResults?.filter(r => r.passed).length * 10 } })}
          className="px-6 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Submit & Proceed
        </button>
      </div>
    </div>
  );
};

export default Level3;
