import React from "react";

// Visual indicator of quiz progress
// - current: 1-based index of current question
// - total: total number of questions
// Uses width percentage to fill the bar and exposes aria attributes for screen readers
const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400">Progress</span>
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 mb-4" aria-label="Quiz progress">
        <div
          className="bg-purple-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        ></div>
        <p className="text-sm text-gray-300 mt-1 text-right">
          Question {current} of {total}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
