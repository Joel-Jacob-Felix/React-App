// src/components/Timer.jsx
import { useEffect, useState } from "react";

export default function Timer({ duration, onTimeUp, resetTrigger }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => setTimeLeft(duration), [resetTrigger]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  return (
    <div className="bg-yellow-300 text-purple-700 px-4 py-2 rounded-full font-bold shadow-md border-2 border-yellow-400">
      ⏳ {timeLeft}s
    </div>
  );
}
