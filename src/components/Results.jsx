import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizCompletion from "./quiz/QuizCompletion";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, difficulty } = location.state || {};

  // If user loads results directly without state, redirect home
  useEffect(() => {
    if (
      typeof score !== "number" ||
      typeof totalQuestions !== "number" ||
      !difficulty
    ) {
      navigate("/", { replace: true });
    }
  }, [score, totalQuestions, difficulty, navigate]);

  if (
    typeof score !== "number" ||
    typeof totalQuestions !== "number" ||
    !difficulty
  ) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#10002B] text-white">
      <QuizCompletion
        score={score}
        totalQuestions={totalQuestions}
        onRestart={() => navigate("/quiz", { state: { difficulty }, replace: true })}
        onGoHome={() => navigate("/", { replace: true })}
      />
    </div>
  );
};

export default Results;
