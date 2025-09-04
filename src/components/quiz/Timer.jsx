import React, { useEffect, useState } from "react";

// Per-question countdown timer
// - Resets when questionIndex changes
// - Calls onTimeUp() when it reaches 0
const Timer = ({ duration, onTimeUp, questionIndex }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, questionIndex]);

  // Tick down every second; stop and fire onTimeUp when reaching 0
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="flex items-center gap-2 text-blue-500 bg-blue-500/10 px-4 py-2 rounded-lg mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      {timeLeft}s remaining
    </div>
  );
};

export default Timer;
