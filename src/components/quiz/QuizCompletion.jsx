import React from "react";

const QuizCompletion = ({ score, totalQuestions, onRestart, onGoHome }) => {
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
      <div className="text-center bg-white/5 rounded-lg p-8 w-full">
        {/* Trophy Icon */}
        <div className="text-6xl mb-4">🏆</div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>

        {/* Score Display */}
        <div className="mb-6">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {score}/{totalQuestions}
          </div>
          <div className={`text-2xl font-semibold ${getScoreColor()}`}>
            {percentage}%
          </div>
        </div>

        {/* Performance Message */}
        <div className="text-xl mb-8 text-gray-300">{getScoreMessage()}</div>

        {/* Action Buttons */}
        <div className="space-y-4">
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

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-400">
          <p>Want to improve your score?</p>
          <p>Try a different difficulty level!</p>
        </div>
      </div>
    </div>
  );
};

export default QuizCompletion;
