# Quizly Architecture and Design Decisions

This document provides a high-level overview of Quizly’s architecture, including routing, data flow, state management, and component responsibilities. It also captures key design decisions and trade-offs.

## Goals

- Provide a fast, mobile-friendly quiz experience.
- Keep the app offline-first by using a local dataset.
- Make the codebase easy to understand and extend (routing, clear component boundaries, and documented flow).

## Tech Stack

- React + Vite
- React Router (client-side routing)
- Tailwind CSS (utility-first styling)

## Routing

Defined in `src/App.jsx` and enabled via `BrowserRouter` in `src/main.jsx`.

- `/` → `Home`: Landing page with difficulty selection; navigates to `/quiz` via route state `{ difficulty }`.
- `/quiz` → `Quiz`: Core quiz flow. Loads local data, shuffles questions/options. Tracks user answers and progress.
- `/results` → `Results`: Final summary screen showing score and per-question breakdown. Guarded route — redirects to `/` if required state is missing.

Why routing?
- Keeps entry, flow, and completion concerns separated.
- Enables direct sharing and bookmarking of pages while guarding invalid entry (e.g., results without quiz state).

## Data Flow and State

- Questions source: `src/components/questions.json` (local, offline-ready).
- `Quiz` builds the working question set from the dataset based on difficulty (easy=10, medium=15, hard=20).
- `Quiz` owns quiz state: `currentQuestion`, `answers`, `questions`, `isLoading`, `error`, `showAnswer`, `score`.
- Summary building: after the last question (Finish, auto-advance, or time-up), `Quiz` calculates `score` and builds `summary` (array with `question`, `options`, `selectedIndex`, `correctIndex`, `isCorrect`).
- Navigation: `Quiz` navigates to `/results` and passes `{ score, totalQuestions, difficulty, summary }` via route state.
- Guarding: `Results` checks the presence and types of expected state and redirects to `/` if missing/invalid.

## Component Responsibilities

- `Home` — UI for selecting difficulty and starting a quiz. No quiz logic.
- `Quiz` — Orchestrates quiz lifecycle: loading, shuffling, timing, selection, progress, and completion.
- `QuestionCard` — Presents a single question, handles selection UI, highlights correctness when `showCorrectAnswer` is true.
- `Timer` — Per-question countdown; resets when the question index changes; calls `onTimeUp` when time reaches zero.
- `ProgressBar` — Shows numeric and visual progress.
- `QuizHeader` — Displays difficulty and provides an Exit action.
- `Results` — Hosts the results UI and provides navigation actions.
- `QuizCompletion` — Visual summary of final score and per-question details; mobile-responsive layout.
- `quizUtils` — Utilities (e.g., `shuffleArray`) and transformation helpers.

## Key Interactions

- Selection: Selecting an answer sets it in `answers` and temporarily shows correctness UI, then auto-advances after 2s.
- Timing: If time runs out, either go to next question or finish on the last one.
- Completion: On last question, compute `score`, build `summary`, and navigate to `/results`.

## Design Decisions and Trade-offs

- Local-only data over remote APIs for reliability and offline support.
- Route state for passing results is simple and avoids global stores; guarded redirects handle invalid entry points.
- Shuffling is done per run and per question to reduce predictability.
- Minimal external dependencies keep bundle small and maintenance easy.
- Tailwind classes keep styles collocated and consistent; responsive tweaks ensure small screens work well.

## Extensibility

- Add categories/tags: Extend the dataset shape and display filters on `Home`.
- Persist progress: Introduce `localStorage` reads/writes in `Quiz`.
- Review answers: Insert a dedicated review step before navigating to `/results`.
- Sharing: Add a share/copy feature in `Results` to export the summary.

## Error Handling

- Local dataset missing or empty → user-friendly error.
- Direct access to `/results` without state → redirect to `/`.

## File Map

See `README.md` for a quick project structure overview. This document focuses on how pieces fit together; refer to source comments for implementation details.
