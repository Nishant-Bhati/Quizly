import { useState, useEffect, useCallback } from "react";
import QuizHeader from "./QuizHeader";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import QuestionCard from "./QuestionCard";
import { shuffleArray } from "../../utils/quizUtils";
import questionsData from "../questions.json";
import { useLocation, useNavigate } from "react-router-dom";

// Helper function to decode HTML entities (kept for compatibility, though not required for local data)
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Quiz = ({ difficulty, onExit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const resolvedDifficulty = (difficulty || location.state?.difficulty || "easy").toLowerCase();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const loadQuestions = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      // Determine number of questions by difficulty
      const difficultyMap = {
        easy: 10,
        medium: 15,
        hard: 20,
      };
      const count = difficultyMap[resolvedDifficulty] || 10;

      // Shuffle the full dataset to avoid repetition and pick first N
      const shuffledPool = shuffleArray(questionsData);
      const picked = shuffledPool.slice(0, count);

      if (!picked.length) {
        throw new Error("No questions available in local dataset.");
      }

      // Format questions to internal structure and shuffle options per question
      const formattedQuestions = picked.map((q, index) => {
        const options = shuffleArray([q.A, q.B, q.C, q.D]);
        const correctText = q[q.answer]; // e.g., q['A'] => correct answer text
        return {
          id: index + 1,
          text: q.question,
          options,
          category: "General Knowledge",
          difficulty: resolvedDifficulty,
          correctAnswer: options.indexOf(correctText),
        };
      });

      setQuestions(formattedQuestions);
      setUsingFallback(false);
    } catch (e) {
      setError("Failed to load local questions.");
    } finally {
      setIsLoading(false);
    }
  }, [resolvedDifficulty]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // Reset showAnswer when question changes
  useEffect(() => {
    setShowAnswer(false);
  }, [currentQuestion]);

  const handleTimeUp = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Time's up on last question, finish quiz and navigate
      const finalScore = calculateScore();
      setIsQuizCompleted(true);
      navigate("/results", {
        state: {
          score: finalScore,
          totalQuestions: questions.length,
          difficulty: resolvedDifficulty,
        },
        replace: true,
      });
    }
  };

  const handleSelectAnswer = (answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }));
    setShowAnswer(true);

    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setShowAnswer(false);
      } else {
        // Last question, finish quiz
        const finalScore = calculateScore();
        setIsQuizCompleted(true);
        navigate("/results", {
          state: {
            score: finalScore,
            totalQuestions: questions.length,
            difficulty: resolvedDifficulty,
          },
          replace: true,
        });
      }
    }, 2000);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    return correctAnswers;
  };

  const handleNext = () => {
    // Prevent progressing without a selection
    if (answers[currentQuestion] === undefined) {
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      // Last question, finish quiz
      const finalScore = calculateScore();
      setIsQuizCompleted(true);
      navigate("/results", {
        state: {
          score: finalScore,
          totalQuestions: questions.length,
          difficulty: resolvedDifficulty,
        },
        replace: true,
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setShowAnswer(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <QuizHeader difficulty={resolvedDifficulty} onExit={() => navigate('/')} />
        <div className="text-center">Loading questions...</div>
      </div>
    );
  }

  console.log(
    "Render check - error:",
    error,
    "questions.length:",
    questions.length,
    "usingFallback:",
    usingFallback
  );
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <QuizHeader difficulty={resolvedDifficulty} onExit={() => navigate('/')} />
        <div className="text-center text-red-400">{error}</div>
      </div>
    );
  }

  if (!questions.length) {
    return null;
  }

  // Determine if current question has a selected answer
  const hasSelected = answers[currentQuestion] !== undefined;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <QuizHeader difficulty={resolvedDifficulty} onExit={() => navigate('/')} />

      {usingFallback && (
        <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm flex items-center gap-2">
            <span>⚠️</span>
            Using sample questions (API unavailable). You can still enjoy the
            quiz!
          </p>
        </div>
      )}

      <ProgressBar current={currentQuestion + 1} total={questions.length} />
      <Timer
        duration={30}
        onTimeUp={handleTimeUp}
        questionIndex={currentQuestion}
      />

      <QuestionCard
        question={questions[currentQuestion]}
        selectedAnswer={answers[currentQuestion]}
        onSelectAnswer={handleSelectAnswer}
        showCorrectAnswer={showAnswer}
      />

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion < 1}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto
            ${
              currentQuestion < 1
                ? "bg-white/10 text-gray-500 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20"
            }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!hasSelected}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto
            ${
              !hasSelected
                ? "bg-purple-600/50 text-white/80 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
