/*import { useState } from "react";
import {useNavigate } from "react-router-dom";
import "./App.css"; // Ensure correct CSS path

const HomePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const content = {
    about: "This is the About section. Here, you can describe the event details...",
    instructions: "These are the instructions for the event. Make sure to follow them carefully...",
    details: "Here are the event details. Date, time, location, and more...",
  };

  return (
    <><div className="home-container">
      <div className="box-container">
        <div className="box" onClick={() => setSelected("about")}>About</div>
        <div className="box" onClick={() => setSelected("instructions")}>Instructions</div>
        <div className="box" onClick={() => setSelected("details")}>Details</div>
      </div>

      {selected && (
        <div className="content-box">
          <h2>{selected.charAt(0).toUpperCase() + selected.slice(1)}</h2>
          <div className="content-scroll">
            <p>{content[selected]}</p>
          </div>
        </div>
      )}
    </div><div className="home">
        <h1>Welcome to the Event</h1>
        <button className="next-btn" onClick={() => navigate("/Level1")}>
          Start Level 1
        </button>
      </div></>
  );



};

export default HomePage;
*/



import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const content = {
    about: "This is the About section. Here, you can describe the event details...",
    instructions: "These are the instructions for the event. Make sure to follow them carefully...",
    details: "Here are the event details. Date, time, location, and more...",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      {/* ✅ Box Container */}
      <div className="flex gap-5">
        <div
          className="px-5 py-3 text-center transition bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white"
          onClick={() => setSelected("about")}
        >
          About
        </div>
        <div
          className="px-5 py-3 text-center transition bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white"
          onClick={() => setSelected("instructions")}
        >
          Instructions
        </div>
        <div
          className="px-5 py-3 text-center transition bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white"
          onClick={() => setSelected("details")}
        >
          Details
        </div>
      </div>

      {/* ✅ Content Box */}
      {selected && (
        <div className="mt-5 w-[400px] h-[200px] p-4 border border-gray-600 rounded-lg bg-white shadow-lg">
          <h2 className="text-lg font-semibold">{selected.charAt(0).toUpperCase() + selected.slice(1)}</h2>
          <div className="max-h-[150px] overflow-y-auto p-2">{content[selected]}</div>
        </div>
      )}

      {/* ✅ Start Button */}
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the Event</h1>
        <button
          className="px-6 py-3 mt-5 text-lg text-white transition bg-blue-500 rounded-md hover:bg-blue-700"
          onClick={() => navigate("/Level1")}
        >
          Start Level 1
        </button>
      </div>
    </div>
  );
};

export default HomePage;
