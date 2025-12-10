// src/hooks/useQuiz.js
import { useEffect, useState, useCallback } from "react";

const API_BASE = "http://localhost:4000";

export function useQuiz(isActive) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

  // Fetch questions when quiz becomes active
  useEffect(() => {
    if (!isActive) return;

    setLoading(true);
    setError("");
    setFinished(false);
    setScore(0);
    setCurrentIndex(0);

    fetch(`${API_BASE}/questions`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load questions. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [isActive]);

  const totalQuestions = questions.length;

  const handleAnswer = useCallback(
    (selectedIndex) => {
      if (!questions[currentIndex]) return;

      const correctIndex = questions[currentIndex].correctIndex;
      if (selectedIndex === correctIndex) {
        setScore((prev) => prev + 1);
      }

      const nextIndex = currentIndex + 1;
      if (nextIndex >= totalQuestions) {
        setFinished(true);
      } else {
        setCurrentIndex(nextIndex);
      }
    },
    [currentIndex, questions, totalQuestions]
  );

  const resetQuizState = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setLoading(false);
    setError("");
  };

  return {
    questions,
    currentIndex,
    score,
    totalQuestions,
    loading,
    error,
    finished,
    handleAnswer,
    resetQuizState,
  };
}
