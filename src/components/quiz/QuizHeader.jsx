import React from "react";


const QuizHeader = ({ difficulty, onExit }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-stretch sm:items-center mb-6">
      <button
        onClick={onExit}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors w-full sm:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Exit Quiz
      </button>
      <span className="px-4 py-2 bg-white/10 rounded-lg capitalize text-center sm:text-left">
        {difficulty}
      </span>
    </div>
  );
};

export default QuizHeader;
