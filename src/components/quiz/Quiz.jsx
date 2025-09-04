import { useState, useEffect, useCallback } from "react";
import QuizHeader from "./QuizHeader";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import QuestionCard from "./QuestionCard";
import QuizCompletion from "./QuizCompletion";
import { shuffleArray } from "../../utils/quizUtils";

// Helper function to decode HTML entities
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Quiz = ({ difficulty, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const loadQuestions = useCallback(async () => {
    console.log("loadQuestions called with difficulty:", difficulty);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&difficulty=${difficulty.toLowerCase()}&type=multiple`
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (data.results && data.results.length > 0) {
        const formattedQuestions = data.results.map((q, index) => {
          const options = shuffleArray([
            decodeHtml(q.correct_answer),
            ...q.incorrect_answers.map(decodeHtml),
          ]);

          return {
            id: index + 1,
            text: decodeHtml(q.question),
            correct_answer: decodeHtml(q.correct_answer),
            options: options,
            category: q.category,
            difficulty: q.difficulty,
            // Store the index of the correct answer in the shuffled array
            correctAnswer: options.indexOf(decodeHtml(q.correct_answer)),
          };
        });

        console.log("Setting API questions:", formattedQuestions.length);
        setQuestions(formattedQuestions);
        setUsingFallback(false);
      } else {
        throw new Error("No questions received from API");
      }
    } catch (error) {
      console.error("Error loading questions:", error);
      console.log("Using fallback questions due to API error");
      // Use fallback questions instead of showing error
      setUsingFallback(true);
      setError(null);
      const fallbackQuestions = [
        {
          id: 1,
          category: "General Knowledge",
          text: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: 2,
        },
        {
          id: 2,
          category: "Science",
          text: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          correctAnswer: 0,
        },
        {
          id: 3,
          category: "History",
          text: "Who painted the Mona Lisa?",
          options: [
            "Vincent van Gogh",
            "Pablo Picasso",
            "Leonardo da Vinci",
            "Michelangelo",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          category: "Geography",
          text: "Which is the largest ocean on Earth?",
          options: ["Atlantic", "Indian", "Arctic", "Pacific"],
          correctAnswer: 3,
        },
        {
          id: 5,
          category: "Sports",
          text: "How many players are on a basketball team?",
          options: ["4", "5", "6", "7"],
          correctAnswer: 1,
        },
        {
          id: 6,
          category: "Technology",
          text: "What does CPU stand for?",
          options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Unit",
            "Computer Processing Unit",
          ],
          correctAnswer: 0,
        },
        {
          id: 7,
          category: "Literature",
          text: "Who wrote 'Romeo and Juliet'?",
          options: [
            "Charles Dickens",
            "William Shakespeare",
            "Mark Twain",
            "Jane Austen",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          category: "Mathematics",
          text: "What is 15 × 4?",
          options: ["50", "60", "70", "80"],
          correctAnswer: 1,
        },
        {
          id: 9,
          category: "Biology",
          text: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Cell membrane"],
          correctAnswer: 1,
        },
        {
          id: 10,
          category: "Entertainment",
          text: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1,
        },
      ];
      console.log("Setting fallback questions:", fallbackQuestions.length);
      setQuestions(fallbackQuestions);
    } finally {
      setIsLoading(false);
    }
  }, [difficulty]);

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
      // Time's up on last question, finish quiz
      calculateScore();
      setIsQuizCompleted(true);
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
        calculateScore();
        setIsQuizCompleted(true);
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
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      // Last question, finish quiz
      calculateScore();
      setIsQuizCompleted(true);
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
      <div className="max-w-3xl mx-auto p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading questions...</p>
        </div>
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
      <div className="max-w-3xl mx-auto p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <div className="space-x-4">
            <button
              onClick={loadQuestions}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Retry
            </button>
            <button
              onClick={onExit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return null;
  }

  // Quiz completion screen
  if (isQuizCompleted) {
    return (
      <QuizCompletion
        score={score}
        totalQuestions={questions.length}
        onRestart={() => {
          setCurrentQuestion(0);
          setAnswers({});
          setScore(0);
          setIsQuizCompleted(false);
          setShowAnswer(false);
        }}
        onGoHome={onExit}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <QuizHeader difficulty={difficulty} onExit={onExit} />

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

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion < 1}
          className={`px-6 py-2 rounded-lg flex items-center gap-2
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
          className={`px-6 py-2 rounded-lg flex items-center gap-2 bg-purple-600 hover:bg-purple-700`}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
