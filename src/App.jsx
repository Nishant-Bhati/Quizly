import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/quiz/Quiz";
import Results from "./components/Results";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#10002B] text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
