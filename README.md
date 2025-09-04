🚀 Quizly

A fun, responsive, and offline-ready quiz app built with React, Vite, and Tailwind CSS

Quizly is a mobile-friendly quiz application that runs entirely on a local dataset (questions.json) — no internet required! 🎉
It supports difficulty-based quizzes (Easy 10, Medium 15, Hard 20), randomized questions & options, a progress tracker, and a per-question timer to keep things engaging.

📑 Table of Contents

Getting Started

Project Scripts

Project Structure

✨ Features

🗂 Data Format

🛠 My Approach

📌 Step-by-Step Build Notes

🚧 Future Improvements

⚡ Getting Started
✅ Prerequisites

Node.js v18+

npm

🔧 Installation
npm install

▶️ Run Development Server
npm run dev


Open the printed local URL (usually http://localhost:5173).

📦 Build for Production
npm run build

🔍 Preview Production Build
npm run preview

📜 Project Scripts

npm run dev — Start development server

npm run build — Build production assets

npm run preview — Preview built app locally

📂 Project Structure
index.html                → App mount + meta viewport
src/main.jsx              → React entry
src/App.jsx               → App shell (renders Home)

src/components/
  Home.jsx                → Landing + difficulty selection
  questions.json          → Local dataset (A/B/C/D + answer key)
  
  quiz/
    Quiz.jsx              → Main quiz flow & state mgmt
    QuestionCard.jsx      → Question UI & answer options
    Timer.jsx             → Per-question countdown
    ProgressBar.jsx       → Visual + numeric progress
    QuizHeader.jsx        → Exit button + difficulty display
    QuizCompletion.jsx    → Final score screen

src/utils/
  quizUtils.js            → Helpers (e.g., shuffleArray)

✨ Features

✔️ Difficulty Selection: Easy (10) • Medium (15) • Hard (20)
✔️ Offline-first (local JSON, no API calls)
✔️ Shuffled questions & options on every run
✔️ Progress bar + per-question timer
✔️ Prevents advancing without selecting an answer
✔️ Clean & mobile-responsive UI (React + Tailwind)
✔️ Graceful handling of short/empty datasets

🗂 Data Format (questions.json)

Each item follows this structure:

{
  "question": "Which planet is known as the Red Planet?",
  "A": "Venus",
  "B": "Mars",
  "C": "Jupiter",
  "D": "Saturn",
  "answer": "B"
}


answer = correct option key (A/B/C/D).

🛠 My Approach

⚡ Fast & lightweight: React + Vite + Tailwind = blazing speed + responsive UI.

📂 Offline stable: Local JSON dataset, no API errors.

🎲 Randomized gameplay: Shuffle questions & options per run.

🛡 User safeguards: Prevent moving forward without an answer, restart safely on refresh.

📱 Mobile-first design: Optimized for tap interactions and small screens.

📌 Step-by-Step Build Notes

Init Project → Bootstrapped with Vite + React + Tailwind v4.

App Shell → App.jsx loads Home. No router required.

Home Screen → Difficulty selection & quiz launch.

Quiz Flow → Local JSON data, difficulty → # of questions, shuffled & sliced.

Question Logic → Options randomized per question, correct answer recalculated.

State Mgmt → Track answers, score, progress, completion.

Timers → Reset each question; auto-advance on timeout.

UI Safeguards → Disabled buttons until selection; responsive layouts for mobile.

Edge Cases → Handles empty/short data with user-friendly fallback.

🚧 Future Improvements

🔄 Review answers before final submission

💾 Save progress in localStorage (resume after refresh)

⏭ Add "Skip" feature with skipped question tracking

🏷 Category filters for quizzes

♿ Accessibility improvements (ARIA roles, focus states)

🎯 Demo

🔗 [Add GitHub Pages / Netlify / Vercel link here if deployed]

💡 Final Note

Quizly is built to be simple, fun, and reliable — whether you’re learning React, building quiz apps, or just testing your knowledge offline. 🚀