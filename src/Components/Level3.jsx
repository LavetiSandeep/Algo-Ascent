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
