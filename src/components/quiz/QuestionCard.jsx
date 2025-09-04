import React from "react";

// Presentational component for a single question and its answer options
// Responsibilities:
// - Renders question text and options
// - Highlights selected and correct answers based on props
// - Calls onSelectAnswer when an option is clicked (unless showCorrectAnswer is true)
const QuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showCorrectAnswer = false,
}) => {
  const options = ["A", "B", "C", "D"];

  // Decode HTML entities if present in question/options strings
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Determine Tailwind classes for each option button based on state
  const getButtonClass = (index) => {
    if (showCorrectAnswer) {
      if (index === question.correctAnswer) {
        return "bg-green-600 text-white";
      } else if (index === selectedAnswer && index !== question.correctAnswer) {
        return "bg-red-600 text-white";
      } else {
        return "bg-white/5 text-gray-400";
      }
    }

    return selectedAnswer === index
      ? "bg-purple-600 text-white"
      : "bg-white/5 hover:bg-white/10";
  };

  return (
    <div className="bg-white/5 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <span>Question {question.id}</span>
        <span className="px-3 py-1 bg-white/10 rounded text-sm">
          {decodeHTML(question.category)}
        </span>
      </div>

      <h2 className="text-xl font-semibold mb-6">
        {decodeHTML(question.text)}
      </h2>

      {showCorrectAnswer && (
        <div className="mb-4 p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
          <p className="text-blue-300 text-sm">
            {selectedAnswer === question.correctAnswer ? (
              <span className="flex items-center gap-2">
                <span>✅</span> Correct! Well done!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>❌</span> Incorrect. The correct answer is highlighted in
                green.
              </span>
            )}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showCorrectAnswer && onSelectAnswer(index)}
            disabled={showCorrectAnswer}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all ${getButtonClass(
              index
            )}`}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
              {options[index]}
            </span>
            {decodeHTML(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
