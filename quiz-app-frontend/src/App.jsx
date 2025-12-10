import { useState } from "react";
import QuizPage from "./pages/QuizPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import "./index.css";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-sky-200 flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl font-black text-purple-700 mb-6 drop-shadow-lg tracking-wide animate-bounce">
         🎉 Fun React Quiz 🎉
      </h1>

      {!quizStarted && !showResults && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center space-y-4">
          <p className="text-xl text-purple-600 font-semibold">
            Ready to test your React superpowers? 😄
          </p>

          <button
            onClick={() => setQuizStarted(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-10 py-4 rounded-full text-xl shadow-lg transition-all transform hover:scale-105"
          >
            Start Quiz 🚀
          </button>
        </div>
      )}

      {quizStarted && !showResults && (
        <QuizPage
          onFinish={(result) => {
            setResultData(result);
            setShowResults(true);
            setQuizStarted(false);
          }}
        />
      )}

      {showResults && (
        <ResultPage
          result={resultData}
          onRestart={() => {
            setResultData(null);
            setShowResults(false);
            setQuizStarted(false);
          }}
        />
      )}
    </div>
  );
}
