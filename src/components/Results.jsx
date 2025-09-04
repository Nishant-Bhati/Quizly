import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizCompletion from "./quiz/QuizCompletion";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, difficulty, summary } = location.state || {};

  // Guard: If user hits /results directly or state is malformed, redirect home
  useEffect(() => {
    if (
      typeof score !== "number" ||
      typeof totalQuestions !== "number" ||
      !difficulty ||
      !Array.isArray(summary)
    ) {
      navigate("/", { replace: true });
    }
  }, [score, totalQuestions, difficulty, summary, navigate]);

  if (
    typeof score !== "number" ||
    typeof totalQuestions !== "number" ||
    !difficulty ||
    !Array.isArray(summary)
  ) {
    // Return null if state is invalid or missing
    return null;
  }

  return (
    <div className="min-h-screen bg-[#10002B] text-white">
      {/* Results UI: show final score and per-question breakdown */}
      <QuizCompletion
        score={score}
        totalQuestions={totalQuestions}
        summary={summary}
        // Retry with the same difficulty
        onRestart={() => navigate("/quiz", { state: { difficulty }, replace: true })}
        // Go back to landing page
        onGoHome={() => navigate("/", { replace: true })}
      />
    </div>
  );
};

export default Results;
