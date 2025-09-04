import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/quiz/Quiz";
import Results from "./components/Results";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    // Global layout wrapper for consistent background and text color
    <div className="min-h-screen bg-[#10002B] text-white">
      {/* Route definitions: each route renders a top-level screen */}
      <Routes>
        {/* Landing: difficulty select, navigates to /quiz via route state */}
        <Route path="/" element={<Home />} />
        {/* Core quiz flow: loads data, manages timer and navigation */}
        <Route path="/quiz" element={<Quiz />} />
        {/* Results summary: guarded; redirects home if state missing */}
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
