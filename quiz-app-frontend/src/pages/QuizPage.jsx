// src/pages/QuizPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useQuiz } from "../hooks/useQuiz.js";
import Timer from "../components/Timer.jsx";

const API_BASE = "http://localhost:4000";

export default function QuizPage({ onFinish }) {
  const [questionKey, setQuestionKey] = useState(0);
  const [name, setName] = useState("");

  const {
    questions,
    currentIndex,
    score,
    totalQuestions,
    loading,
    error,
    finished,
    handleAnswer,
  } = useQuiz(true);

  const progressPercent = useMemo(() => {
    if (!totalQuestions) return 0;
    return Math.round((currentIndex / totalQuestions) * 100);
  }, [currentIndex, totalQuestions]);

  useEffect(() => {
    if (finished && totalQuestions) {
      const resultPayload = { name, score, total: totalQuestions };
      fetch(`${API_BASE}/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultPayload),
      });
      onFinish(resultPayload);
    }
  }, [finished]);

  const q = questions[currentIndex];

  if (loading) return <p className="text-purple-700">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-6 w-full max-w-xl">
      
      <div className="flex items-center justify-between">
        <Timer
          duration={30}
          onTimeUp={() => handleAnswer(-1)}
          resetTrigger={questionKey}
        />

        <p className="text-purple-600 text-sm font-bold">
          {currentIndex + 1} / {totalQuestions}
        </p>
      </div>

      <input
        className="w-full px-5 py-3 rounded-full border-2 border-purple-200 focus:ring focus:ring-purple-200 text-purple-800"
        placeholder="Your Name 😄"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h2 className="text-3xl text-purple-700 font-bold text-center">
        {q?.question}
      </h2>

      <div className="space-y-3">
        {q?.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => {
              handleAnswer(idx);
              setQuestionKey((k) => k + 1);
            }}
            className="w-full text-left px-6 py-4 bg-sky-200 hover:bg-sky-300 text-purple-800 rounded-2xl font-semibold shadow-md transition-all transform hover:scale-105"
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="h-4 bg-purple-400 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
