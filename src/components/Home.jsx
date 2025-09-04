import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Landing screen: pick difficulty and start the quiz
const Home = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigate = useNavigate();
  // Start quiz by navigating to /quiz and passing the chosen difficulty via route state
  const handleStartQuiz = () => {
    if (selectedDifficulty) {
      navigate("/quiz", { state: { difficulty: selectedDifficulty } });
    }
  };

  return (
    <div className="min-h-screen bg-[#10002B] text-white flex flex-col items-center py-8 sm:py-12 px-4">
      {/* Trophy Icon and Title */}
      <div className="bg-purple-600 rounded-full p-3 sm:p-4 mb-4 sm:mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 sm:h-12 sm:w-12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 3a7 7 0 0 0-7 7h3c0-2.21 1.79-4 4-4s4 1.79 4 4h3a7 7 0 0 0-7-7zm0 4a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl font-bold text-purple-600 mb-3 sm:mb-4">
        Quizly
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-lg sm:text-xl text-center max-w-2xl mb-8 sm:mb-12 px-2">
        Test your knowledge with challenging questions from around the world
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full max-w-5xl mb-8 sm:mb-12 px-2 sm:px-4">
        {/* Multiple Choice */}
        <div className="bg-gray-900 rounded-lg p-8 flex flex-col items-center text-center">
          <div className="bg-purple-900 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Multiple Choice</h2>
          <p className="text-gray-400">
            Choose from 4 options for each question
          </p>
        </div>

        {/* Timed Questions */}
        <div className="bg-gray-900 rounded-lg p-8 flex flex-col items-center text-center">
          <div className="bg-purple-900 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Timed Questions</h2>
          <p className="text-gray-400">Answer quickly to maximize your score</p>
        </div>

        {/* Global Questions */}
        <div className="bg-gray-900 rounded-lg p-8 flex flex-col items-center text-center">
          <div className="bg-purple-900 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Global Questions</h2>
          <p className="text-gray-400">
            Questions from various categories and difficulties
          </p>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-semibold text-center mb-3">
          Choose Your Challenge
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Select a difficulty level that matches your expertise
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
          {/* Easy */}
          <button
            onClick={() => setSelectedDifficulty("easy")}
            className={`p-6 rounded-xl flex flex-col items-center bg-green-50/5 border-2 ${
              selectedDifficulty === "easy"
                ? "border-green-500"
                : "border-transparent"
            } hover:border-green-500/50 transition-all duration-200`}
          >
            <div className="bg-green-500 rounded-xl p-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-1">Easy</h3>
            <p className="text-gray-400 text-sm text-center">
              Perfect for beginners <br />
              10 questions
            </p>
          </button>

          {/* Medium */}
          <button
            onClick={() => setSelectedDifficulty("medium")}
            className={`p-6 rounded-xl flex flex-col items-center bg-blue-50/5 border-2 ${
              selectedDifficulty === "medium"
                ? "border-blue-500"
                : "border-transparent"
            } hover:border-blue-500/50 transition-all duration-200`}
          >
            <div className="bg-blue-500 rounded-xl p-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-7v4h2v-4h3l-4-4-4 4h3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-1">Medium</h3>
            <p className="text-gray-400 text-sm text-center">
              Balanced challenge <br />
              15 questions
            </p>
          </button>

          {/* Hard */}
          <button
            onClick={() => setSelectedDifficulty("hard")}
            className={`p-6 rounded-xl flex flex-col items-center bg-purple-50/5 border-2 ${
              selectedDifficulty === "hard"
                ? "border-purple-500"
                : "border-transparent"
            } hover:border-purple-500/50 transition-all duration-200`}
          >
            <div className="bg-purple-500 rounded-xl p-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h-2l3 3 3-3h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-1">Hard</h3>
            <p className="text-gray-400 text-sm text-center">
              For trivia masters <br />
              20 questions
            </p>
          </button>
        </div>
      </div>

      {/* Start Quiz Button */}
      <button
        onClick={handleStartQuiz}
        className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full flex items-center gap-2 mb-4 sm:mb-6 text-base sm:text-lg transform hover:scale-105 transition-transform duration-200 ${
          !selectedDifficulty ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!selectedDifficulty}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        Start Quiz
      </button>

      {/* Quiz Info */}
      <p className="text-gray-400 text-sm sm:text-base">
        questions • Choose difficulty • ~5 minutes
      </p>
    </div>
  );
};

export default Home;
