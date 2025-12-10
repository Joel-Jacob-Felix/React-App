// src/pages/ResultPage.jsx
import { useMemo } from "react";

export default function ResultPage({ result, onRestart }) {
  const { name, score, total } = result;

  const percentage = useMemo(
    () => Math.round((score / total) * 100),
    [score, total]
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl text-center p-10 space-y-6 w-full max-w-md">
      
      <h2 className="text-4xl font-black text-purple-700 animate-pulse">
        🎈 Quiz Completed! 🎈
      </h2>

      <p className="text-xl text-purple-600">
        Great job, <span className="font-extrabold">{name}</span>!
      </p>

      <p className="text-2xl font-bold text-purple-700">
        Score: {score} / {total}
      </p>

      <p className="text-4xl">🥳 {percentage}%</p>

      <button
        onClick={onRestart}
        className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full text-xl shadow-lg transition transform hover:scale-105"
      >
        Play Again 🔁
      </button>

    </div>
  );
}
