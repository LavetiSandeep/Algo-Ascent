 /*import React,{ useState } from  "react";
 import axios from "axios";

function OnlineIDE() {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("C");
    const [inputRequired, setInputRequired] = useState("true");
    const [output, setOutput] = useState(""); // New state to store output

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = { code, input, language, inputRequired };
    
        try {
            const response = await fetch("http://localhost:8080/compilecode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result); // Debugging: Check actual response
            setOutput(result.output);
        } catch (error) {
            setOutput("Error compiling code: " + error.message);
            console.error("Error:", error);
        }
        
    };
    

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="mb-4 text-2xl font-bold">Online IDE</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">Code</h3>
                <textarea
                    rows="13"
                    cols="100"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="p-2 border"
                ></textarea>
                <br />
                <h3 className="text-lg font-semibold">Input</h3>
                <textarea
                    rows="10"
                    cols="100"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="p-2 border"
                ></textarea>
                <br />
                <label className="font-semibold">Language:</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-1 ml-2 border"
                >
                    <option value="C">C</option>
                </select>
                <br />
                <label className="font-semibold">Compile with Input:</label>
                <input
                    type="radio"
                    name="inputRadio"
                    value="true"
                    checked={inputRequired === "true"}
                    onChange={() => setInputRequired("true")}
                    className="ml-2"
                /> Yes
                <input
                    type="radio"
                    name="inputRadio"
                    value="false"
                    checked={inputRequired === "false"}
                    onChange={() => setInputRequired("false")}
                    className="ml-2"
                /> No
                <br />
                <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded">Submit</button>
                
            </form>
            <div className="w-3/4 p-4 mt-4 border rounded">
                <h3 className="text-lg font-semibold">Output</h3>
                <pre className="p-2 bg-gray-100">HIIII{output}</pre>
            </div>
            {/* Output Section /}
           

        </div>
    );
}

export default OnlineIDE;
*/







/*
import React, { useState } from "react";
import axios from "axios";

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
              "Content-Type": "application/json", // Note: This header is usually set by the server.
            },
            credentials: "include", // Ensures cross-origin cookies (if applicable)
            body: JSON.stringify({
              code: code,
              input: input,
              inputRadio: compileWithInput ? "true" : "false",
              lang: "C"
            })
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setOutput(data);
        } catch (error) {
          setOutput("Error in compilation: " + error.message);
        }
      };
      
    return (
        <div>
            <h2>Online IDE - Level 3</h2>
            <textarea 
                rows="10" 
                cols="50" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="Write your C code here..."
            />
            <br />
            <textarea 
                rows="5" 
                cols="50" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Input (if needed)"
            />
            <br />
            <label>
                Compile with Input:
                <input 
                    type="checkbox" 
                    checked={compileWithInput} 
                    onChange={(e) => setCompileWithInput(e.target.checked)} 
                />
            </label>
            <br />
            <button onClick={handleCompile}>Run Code</button>
            <h3>Output:</h3>
            <pre>{output}</pre>
        </div>
    );
};

export default Level3;*/







import React, { useState } from "react";

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
