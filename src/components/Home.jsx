import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4">
      {/* Trophy Icon and Title */}
      <div className="bg-purple-600 rounded-full p-4 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 3a7 7 0 0 0-7 7h3c0-2.21 1.79-4 4-4s4 1.79 4 4h3a7 7 0 0 0-7-7zm0 4a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-6xl font-bold text-purple-600 mb-4">QuizMaster</h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-xl text-center max-w-2xl mb-12">
        Test your knowledge with challenging questions from around the world
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
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

      {/* Start Quiz Button */}
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        Start Quiz
      </button>

      {/* Quiz Info */}
      <p className="text-gray-400">
        10 questions • Mixed difficulty • ~5 minutes
      </p>
    </div>
  );
};

export default Home;
