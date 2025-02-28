/*import React, { useState } from "react";
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
*/


const Round1 = ({ setAllPassed }) => {


  const location = useLocation();

  const participant = location.state?.participant || {}; // Ensure it's an object
  const randomNumber = participant.randomnumber || 1;

  console.log("participant", participant);
  console.log("Participant Data:", participant.name);
  console.log("Participant Data:", participant.round1submissiontime);

  const problemSets = {
      1: {
          Emojicode: `
  🔢 = 123456  
  🔡 = [ ]  
  🔢1 = [ ]  
  🔁(🔢 > 0) {  
      📍 = 🔢 % 10  
      🤔(📍 ⚖ 2) 👉 🔡 ➕= 📍  
      🤔(📍 ⚖ 4) 👉 🔡1 ➕= 📍  
      🔢 ➗= 10  
  }  
  📜 = 🔡 ➕🔡1  
  🔁(📜 📏 > 0) {  
      📍 = 📜 % 10  
      🤔(📍 ⚖ 5) 👉 📜 ➖= 1  
  }  
  ✍(📜)  
          `,

          exampleTestCases: [
              { input: "10", output: "20" },
              { input: "20", output: "40" },
          ],
          Input: "10",
          testCases: [
              { input: "10", expectedOutput: "20" },
              { input: "20", expectedOutput: "40" },
              { input: "30", expectedOutput: "60" },
              { input: "70", expectedOutput: "140" },
              { input: "120", expectedOutput: "240" },
          ]
      },
      2: {
          Emojicode: `
📌 mystory_one(🔢) {  
  🎈 = 0;  
  🔁(🔢 ▶ 0) 
  {  
    🎈 = 🎈 * 10 ➕ (🔢 % 10);  
     🔢 /= 10; 
  }  
  ↩ 🎈 ;  
}
📌 mystory_two(🔢) {  
  📜 = 0; 
  🔁(🔢 ▶ 0) {  
      🔤 = 🔢 % 10;  
      📜 ➕= 🔤 * 🔤; 
      🔢 /= 10;  
  }  
  ↩ 📜;   
}
📌 mystory_final(🔢) {  
  🔑 = mystory_one(🔢);  
  ↩ mystory_two(🔑);  
}

✍ Mystory_final(🔢)

          `,
          exampleTestCases: [
              { input: "123", output: "14" },
              { input: "103", output: "10" },
          ],
          Input: "123",
          testCases: [
              { input: "123", expectedOutput: "14" },
              { input: "103", expectedOutput: "10" },
              { input: "789", expectedOutput: "194" },
              { input: "100", expectedOutput: "1" },
          ]
      },
      3: {
          Emojicode: `
  📌 mystory_one(🔢, 🎁) {  
  🎁 [0] = 0, 
  🎁 [1] = 1;  
  🔁 (🔤 = 2; 🔤 ▶ 🔢; 🔤⏩)  
      🎁 [🔤] = 🎁 [🔤 ➖ 1] ➕ 🎁 [🔤 ➖ 2];  
}

📌 mystory_two(🔢) {  
  🎁 [🔢];  
  mystory_one(🔢, 🎁);  

  🍬 ,📍 = 0;  
  🔁 (🔤 = 0 ; 🔤 ▶ 🔢; 🔤⏩) {  
      🤔 (🎁 [🔤] % 2 🟰 0) 👉 
          📍 ➕= 🎁 [🔤];  
      ❌  
          🍬 ➕= 🎁 [🔤];  
  }  
  ↩  🍬 ➖ 📍 ;   
}

📌 mystory_final(🔢) {  
  🍟= mystory_two(🔢)
  ↩ 🍟;
  
}
✍ Mystory_final(🔢)

          `,
          exampleTestCases: [
              { input: "5", output: "3" },
              { input: "6", output: "8" },
          ],
          Input: "5",
          testCases: [
              { input: "5", expectedOutput: "3" },
              { input: "6", expectedOutput: "8" },
              { input: "7", expectedOutput: "0" },
              { input: "8", expectedOutput: "13" },
          ]
      },
      4: {
          Emojicode: `
  🔢 = 1001  
  🔡 = 0  
  🔁(🔢 > 0) {  
      📜 = 🔢 % 10  
      🤔(📜 ⚖ 1) 👉 🔡 ➕= 📜  
      🔢 ➗= 10  
  }
  ✍(🔡)
          `,
          exampleTestCases: [
              { input: "101", output: "2" },
              { input: "111", output: "3" },
          ],
          Input: "101",
          testCases: [
              { input: "101", expectedOutput: "2" },
              { input: "111", expectedOutput: "3" },
          ]
      },
      5: {
          Emojicode: `
  🔢 = 9  
  🔡 = 🔢 ** 2  
  ✍(🔡)
          `,
          exampleTestCases: [
              { input: "2", output: "4" },
              { input: "3", output: "9" },
          ],
          Input: "2",
          testCases: [
              { input: "2", expectedOutput: "4" },
              { input: "3", expectedOutput: "9" },
          ]
      }
  };

  const [selectedLanguage, setSelectedLanguage] = useState(
      participant?.language && participant.language.trim() !== "" ? participant.language : "c"
  );

  useEffect(() => {
      const fetchlanguage = async () => {
          if (!participant.email) return; // Ensure email exists before making request

          try {
              const response = await fetch(http ://localhost:5000/getlanguage?email=${encodeURIComponent(participant.email)});
              const data = await response.json();

              if (response.ok) {
                  if (data.language)
                      setSelectedLanguage(data.language); // Set the submitted code if available
              } else {
                  console.error("Error fetching code:", data.message);
              }
          } catch (error) {
              console.error("Error fetching code:", error);
          }
      };

      fetchlanguage();
  }, [participant.email]);


  const [code, setCode] = useState(participant?.submittedCode || "");

  useEffect(() => {
      const fetchCode = async () => {
          if (!participant.email) return; // Ensure email exists before making request

          try {
              const response = await fetch(http://localhost:5000/getsubmittedcode?email=${encodeURIComponent(participant.email)});
              const data = await response.json();

              if (response.ok) {
                  setCode(data.submittedCode || ""); // Set the submitted code if available
              } else {
                  console.error("Error fetching code:", data.message);
              }
          } catch (error) {
              console.error("Error fetching code:", error);
          }
      };

      fetchCode();
  }, [participant.email]);



  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState({
      failedCount: 0,
      oneFailedTest: [],
      satisfiedTestCases: [],
  });

  const [withInput, setWithInput] = useState(true);
  const [Round1sub, setRound1Time] = useState(participant.round1submissiontime || "");

  useEffect(() => {
      const fetchTime = async () => {
          if (!participant.email) return; // Ensure email exists before making request

          try {
              const response = await fetch(http://localhost:5000/getsubmissiontime?email=${encodeURIComponent(participant.email)});
              const data = await response.json();

              if (response.ok) {
                  setRound1Time(data.subtime || ""); // Set the submitted code if available

              } else {
                  console.error("Error fetching code:", data.message);
              }
          } catch (error) {
              console.error("Error fetching code:", error);
          }
      };

      fetchTime();
  }, [participant.email]);


  useEffect(() => {
      if (Round1sub) {
          setAllPassed(true);  // If submission time exists, mark Round 1 as passed
      }
  }, [Round1sub]);

  const getRandomNumber = () => {
      return Math.floor(Math.random() * 5) + 1;
  };


  const handleLanguageChange = (e) => {
      setSelectedLanguage(e.target.value);
  };



  const { Emojicode, exampleTestCases = [], testCases = [], Input = "" } = problemSets[randomNumber] || problemSets[1] || {};
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleRunCode = async () => {
      setIsLoading1(true);
      try {
          const input = withInput ? Input : "";  // Only send input if 'withInput' is true

          const response = await fetch('http://localhost:5000/compile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  language: selectedLanguage,
                  code: code,
                  action: "run",
                  withInput: withInput,
                  input: input  // Send input (empty if not with input)
              }),
          });

          const result = await response.json();
          setOutput(result.output || result.message);
      } catch (error) {
          setOutput('Error running the code: ' + error.message);
      }
      finally {
          setIsLoading1(false); // Stop loading
      }
  };


  const handleSubmit = async () => {

      setIsLoading2(true);
      try {
          const response = await fetch('http://localhost:5000/compile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  language: selectedLanguage,
                  code: code,
                  action: "submit",
                  testcases: testCases,
              }),
          });

          const result = await response.json();
          console.log(result.status);

          if (result.status === "success") {
              // Check test results to update 
              // the state
              setRound1Time(result.subtime);
              const passedTestCases = result.passedTestCases.map(tc => ({
                  input: tc.input,
                  expected: tc.expected,
                  got: tc.got,
                  status: "passed"
              })) || [];

              // Determine if all test cases passed

              console.log("charan", passedTestCases);

              // Update test results
              setTestResults({
                  failedCount: 0,
                  oneFailedTest: null,
                  satisfiedTestCases: [passedTestCases[0], passedTestCases[1]],
              });




          } else {
              if (result.failedTestCases.length > 0) {
                  let failedCount = result.failedTestCases.length;
                  let oneFailedTest = result.failedTestCases[0];

                  let passedTestCases = result.passedTestCases?.map(tc => ({
                      input: tc.input,
                      expected: tc.expected,
                      got: tc.got,
                      status: "passed"
                  })) || [];

                  setTestResults({
                      failedCount,
                      oneFailedTest: {
                          input: oneFailedTest.input,
                          expected: oneFailedTest.expected,
                          got: oneFailedTest.got,
                          status: "failed"
                      },
                      satisfiedTestCases: passedTestCases,
                  });
              } else if (result.error) {
                  setTestResults({
                      failedCount: 0,
                      oneFailedTest: {
                          input: "N/A",
                          expected: "N/A",
                          got: result.error,
                          status: "error"
                      },
                      satisfiedTestCases: [],
                  });
              }
          }
      } catch (error) {
          setTestResults({
              failedCount: 0,
              oneFailedTest: {
                  input: "N/A",
                  expected: "N/A",
                  got: Error running the code: ${error.message},
                  status: "error"
              },
              satisfiedTestCases: [],
          });
      }
      finally {
          setIsLoading2(false); // Stop loading
      }

      // setAllPassed(allPassed);
      console.log(testCases)
  };
  const languages = ["python", "cpp", "c", "java"];

  return (

      <div>
          <h3 className="pb-5 text-5xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text drop-shadow-lg animate-pulse">
              Emoji Decription
          </h3>

          {Round1sub && (
              <h3 className="mb-5 text-lg font-bold text-center text-green-700">
                  Submission Time: {Round1sub}
              </h3>
          )}
          <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6 text-gray-900 bg-white md:flex-row md:items-start md:space-y-0 md:space-x-6">
              {/* Emoji Code Section */}
              <div className="flex flex-col w-full p-6 rounded-lg md:w-1/2 bg-gray-00 bg-slate-200">

                  <div className="p-4 rounded-lg bg-navy-100 ">
                      <p className="mb-3 text-lg font-bold text-navy-700 text-start">🎯 <strong>Task:</strong> Convert this emoji-based code into a valid program.</p>
                      <pre className="p-4 font-bold rounded-md bg-navy-50 text-navy-800 text-md">{Emojicode}</pre>
                      <div className="mt-4">
                          <h4 className="pl-3 text-lg font-semibold text-navy-600 text-start">Test Cases</h4>
                          {exampleTestCases.map((testCase, index) => (
                              <div key={index} className="p-3 mt-2 rounded-md bg-navy-50 ">
                                  {index === 0 && <p className="font-bold text-navy-500">Initial Predefined Input</p>}
                                  <p><strong>Input:</strong> {testCase.input}</p>
                                  <p><strong>Output:</strong> {testCase.output}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Write Your Code Section */}
              <div className="flex flex-col w-full bg-white rounded-lg md:w-1/2">
                  <h3 className="mb-4 text-2xl font-bold text-navy-600 text-start">Write Your Code</h3>
                  <div className="flex space-x-6">
                      <div className="flex justify-center mb-4">
                          <select
                              value={selectedLanguage}
                              onChange={(e) => setSelectedLanguage(e.target.value)}
                              className="p-2 border border-gray-300 rounded-md bg-navy-100 text-navy-700"
                          >
                              <option value={selectedLanguage}>{selectedLanguage}</option>
                              {languages.filter((lang) => lang !== selectedLanguage).map((lang) => (
                                  <option key={lang} value={lang} className="text-navy-900">
                                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                  </option>
                              ))}
                          </select>
                      </div>

                      {/* <div className="flex justify-center mb-4">
              <label className="flex items-center text-navy-700">
                  <input
                      type="checkbox"
                      checked={!withInput}
                      onChange={() => setWithInput(!withInput)}
                      className="mr-2"
                  />
                  <span>Run without input</span>
              </label>
          </div> */}
                  </div>

                  <div className="pt-3 rounded-lg bg-navy-50 ">
                      <MonacoEditor
                          height="400px"
                          language={selectedLanguage}
                          theme="light"
                          value={code}
                          onChange={(value) => setCode(value)}
                      />
                  </div>
                  <div className="flex justify-start mt-4 space-x-4">
                      <button
                          onClick={handleRunCode}
                          className={`px-6 py-2 rounded-md shadow-md flex items-center justify-center gap-2 transition-all duration-300 ease-in-out 
      ${isLoading1 ? ' bg-[#01052A] text-white cursor-not-allowed' : 'bg-[#01052A] text-white hover:bg-navy-50'}`}
                          disabled={isLoading1}
                      >
                          {isLoading1 ? (
                              <>
                                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                  Running...
                              </>
                          ) : (
                              'Run Code'
                          )}
                      </button>

                      <button
                          onClick={handleSubmit}
                          disabled={Round1sub || isLoading2}
                          className={`px-8 py-2 rounded-md shadow-md flex items-center justify-center gap-2 transition-all duration-300 ease-in-out 
      ${Round1sub || isLoading2 ? "bg-[#01052A] text-white cursor-not-allowed" : "bg-[#01052A] text-white hover:bg-navy-600"}`}
                      >
                          {isLoading2 ? (
                              <>
                                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                  Submitting...
                              </>
                          ) : (
                              "Submit"
                          )}
                      </button>

                  </div>
                  <div className="mt-4">
                      <h4 className="pl-2 text-lg font-semibold text-navy-600 text-start">Output</h4>
                      <pre className="p-4 text-sm border border-gray-300 rounded-md bg-navy-50 text-navy-800">{output || 'No output yet.'}</pre>
                  </div>
                  <div className="mt-4">
                      <h4 className="text-lg font-semibold text-navy-600 text-start">Test Case Results</h4>
                      <ul>
                          {testResults.failedCount === 0 && testResults.satisfiedTestCases.length > 0 ? (
                              <>
                                  <li className="font-bold text-green-600 text-start">✅ All Test Cases Passed!</li>
                                  {testResults.satisfiedTestCases.map((tc, index) => (
                                      <li key={index} className="text-green-600 text-start">
                                          <strong>Input:</strong> {tc.input} <br />
                                          <strong>Expected:</strong> {tc.expected} <br />
                                          <strong>Got:</strong> {tc.got} <br />
                                          <strong>Status:</strong> ✅ Success
                                      </li>
                                  ))}
                              </>
                          ) : (
                              <>
                                  {testResults.satisfiedTestCases?.length > 0 && (
                                      <li className="text-green-600 ">✅ Passed Test Cases: {testResults.satisfiedTestCases.length}</li>
                                  )}
                                  {testResults.failedCount > 0 && (
                                      <li className="text-red-500 ">❌ Failed Test Cases: {testResults.failedCount}</li>
                                  )}
                              </>
                          )}
                      </ul>
                  </div>
              </div>
          </div>
      </div>

  );
};