export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatQuestions = (apiQuestions) => {
  return apiQuestions.map((q, index) => {
    // Combine and shuffle answers
    const options = shuffleArray([
      ...q.incorrect_answers,
      q.correct_answer
    ]);

    return {
      id: index + 1,
      category: q.category,
      text: q.question,
      options: options,
      // Store the index of the correct answer in the shuffled array
      correctAnswer: options.indexOf(q.correct_answer)
    };
  });
};
