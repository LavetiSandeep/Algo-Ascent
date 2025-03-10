/*import { useState } from "react";
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
      {/* ✅ Box Container /}
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

      {/* ✅ Content Box /}
      {selected && (
        <div className="mt-5 w-[400px] h-[200px] p-4 border border-gray-600 rounded-lg bg-white shadow-lg">
          <h2 className="text-lg font-semibold">{selected.charAt(0).toUpperCase() + selected.slice(1)}</h2>
          <div className="max-h-[150px] overflow-y-auto p-2">{content[selected]}</div>
        </div>
      )}

      {/* ✅ Start Button /}
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
*/

import { motion } from "framer-motion"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState({ about: false, instructions: false, details: false });

  const content = {
    About: (
      <div className="text-lg">
        Algo Ascent is a three-stage technical challenge designed for  students to test their theoretical knowledge, problem-solving abilities, and coding skills.
        <br /><br />
        <strong>Level 1 – Theoretical Traverse (15 Questions):</strong> <br />
        A fundamental round featuring 15 theory-based questions on basic c programming, data structures, and computer science concepts. No eliminations—everyone qualifies for the next level.
        <br /><br />
        <strong>Level 2 – Algo Arena (6 Questions):</strong> <br />
        A challenging round with 6 problem-solving questions that require analytical thinking and coding skills. Only top scorers of level1 + level2 scores qualify for the final round.
        <br /><br />
        <strong>Level 3 – Code Conqueror (Final Problem):</strong> <br />
        A high-stakes final coding challenge. The  participant with highest score in the final problem wins the competition.
      </div>
    ),
    Instructions: (
      <div className="text-lg">
        The Following are the instructions that you have to follow while playing the Event.
        <br /><br />
        <strong>1 -</strong> This is an individual event; no team participation is allowed.
        <br /><br />
        <strong>2 -</strong> Each Level has a set duration; participants must answer and submit their solutions within the time.
        <br /><br />
        <strong>3 -</strong> Participants must not use any other platforms other than the given website.
        <br /><br />
        <strong>4 -</strong> Usage of mobile phones is prohibited during the Event.
        <br /><br />
      
        <strong>5 -</strong> In case of tie-breaker situation time of submission will be considered to decide the winner.
     <br /><br />
        <strong>6 -</strong> Finally, the top scorer will receive the prize, and the participants are honored with participation certificates.
          
      </div>
    ),
    Cordinators: (
      <div className="text-lg text-center">
        
        
        {/*sandeep*/}
        <div className="flex items-center w-64 p-4 space-x-4 rounded-lg shadow-md">
  {/* Passport-size Image */}
  <img 
    src="/sandeep.jpg"  // Replace with actual image path
    alt="Coordinator" 
    className="object-cover bg-transparent rounded-full w-18 h-18"
  />
</div>

        sandeep<br/><br/>

        {/*kalyani */}

        <div className="flex items-center w-64 p-4 space-x-4 rounded-lg shadow-md">
  {/* Passport-size Image */}
  <img 
    src="/sandeep.jpg"  // Replace with actual image path
    alt="Coordinator" 
    className="object-cover bg-transparent rounded-full w-18 h-18"
  />
</div>

        M. Kalyani<br /><br />

      {/*jyoshika*/}
        <div className="flex items-center w-64 p-4 space-x-4 rounded-lg shadow-md">
  {/* Passport-size Image */}
  <img 
    src="/sandeep.jpg"  // Replace with actual image path
    alt="Coordinator" 
    className="object-cover bg-transparent rounded-full w-18 h-18"
  />
</div>



        B. Jyoshika<br />
      </div>
    ),
  };

  const handleClick = (option) => {
    setFlipped((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100"
      style={{
        backgroundImage: "url('/homebackpage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
     {/* ✅ Welcome Message */}
     <div className="px-5 py-4 mx-auto my-10 border shadow-lg bg-white/10 backdrop-blur-lg border-white/30 rounded-2xl max-w-fit">
        <h1 className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-indigo-400 via-pink-500 to-blue-500 bg-clip-text">
          WELCOME TO THE EVENT
        </h1>
      </div> 
      {/* ✅ Flipping Containers */} 
      <div className="flex gap-8">
        {
        ["About", "Instructions", "Cordinators"].map((option) => (
          <motion.div
            key={option}
            className="relative text-lg font-semibold cursor-pointer w-80 h-96"
            onClick={() => handleClick(option)}
          >
            {/* Front Side */}
            <motion.div className="relative w-80 aspect-[3/4] p-4 rounded-lg shadow-lg overflow-hidden"

              initial={false}
              animate={{ rotateY: flipped[option] ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ backfaceVisibility: "hidden" }}
            >
              <h2 className="absolute z-10 text-xl font-bold text-white transform -translate-x-1/2 top-4 left-1/2">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </h2>
              <img src={"/home.jpg"} alt={option} className="absolute inset-0 object-cover rounded-lg w-80 h-96" />
             </motion.div>

            {/* Back Side (Scrollable without Scrollbar) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-6 text-sm leading-6 text-white rounded-lg shadow-lg bg-black-500"
              initial={false}
              animate={{ rotateY: flipped[option] ? 0 : -180 }}
              transition={{ duration: 0.6 }}
              style={{ backfaceVisibility: "hidden", overflow: "hidden" }}
            >
              <div className="w-full max-h-full overflow-y-auto scrollbar-hide text-black-300">
                {content[option]}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ✅ Start Button */}
      <button
        className="px-6 py-3 mt-8 text-lg text-white transition bg-blue-500 rounded-md hover:bg-blue-700"
        onClick={() => navigate("/waiting")}
      >
        Start Level 1
      </button>
    </div>
  );
};

export default HomePage;
