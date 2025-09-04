import React from "react";

const QuizCompletion = ({
  score,
  totalQuestions,
  summary = [],
  onRestart,
  onGoHome,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-blue-400";
    if (percentage >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 flex items-center justify-center min-h-screen">
      <div className="text-center bg-white/5 rounded-lg p-6 sm:p-8 w-full">
        {/* Trophy Icon */}
        <div className="text-5xl sm:text-6xl mb-4">🏆</div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Quiz Completed!</h1>

        {/* Score Display */}
        <div className="mb-6">
          <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
            {score}/{totalQuestions}
          </div>
          <div
            className={`text-xl sm:text-2xl font-semibold ${getScoreColor()}`}
          >
            {percentage}%
          </div>
        </div>

        {/* Performance Message */}
        <div className="text-lg sm:text-xl mb-8 text-gray-300">
          {getScoreMessage()}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 sm:space-y-4 mb-8">
          <button
            onClick={onRestart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Try Again
          </button>

          <button
            onClick={onGoHome}
            className="w-full bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Answer Summary */}
        {Array.isArray(summary) && summary.length > 0 && (
          <div className="text-left mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Answer Summary
            </h2>
            <div className="space-y-3 max-h-[50vh] sm:max-h-[60vh] overflow-auto pr-1">
              {summary.map((item, idx) => {
                const userPicked = item.selectedIndex;
                const correct = item.correctIndex;
                const isCorrect = item.isCorrect;
                return (
                  <div
                    key={item.id || idx}
                    className={`rounded-lg p-4 border ${
                      isCorrect
                        ? "border-green-600/40 bg-green-600/10"
                        : "border-red-600/40 bg-red-600/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-medium break-words text-sm sm:text-base">
                        <span className="text-gray-400 mr-2">Q{idx + 1}:</span>
                        {item.question}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          isCorrect
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm">
                      <p className="mb-1">
                        <span className="text-gray-400">Your answer: </span>
                        {userPicked === undefined || userPicked === null ? (
                          <span className="text-gray-300">Not answered</span>
                        ) : (
                          <span
                            className={`${
                              isCorrect ? "text-green-300" : "text-red-300"
                            }`}
                          >
                            {item.options[userPicked]}
                          </span>
                        )}
                      </p>
                      <p>
                        <span className="text-gray-400">Correct answer: </span>
                        <span className="text-green-300">
                          {item.options[correct]}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCompletion;
