import { useEffect, useRef, useState } from 'react';
import { saveSession } from '../services/studyStorage';
import { StudySession } from '../types/StudySession';

export function useStudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null); // ✅ AQUI

  function start() {
    if (intervalRef.current !== null) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  function stop() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }

  async function finishStudy(subject: string) {
    stop();

    if (seconds === 0) return;

    const session: StudySession = {
      id: String(Date.now()),
      subject,
      durationMinutes: Math.floor(seconds / 60),
      date: new Date().toISOString(),
    };

    await saveSession(session);
    setSeconds(0);
  }

  function reset() {
    stop();
    setSeconds(0);
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
    finishStudy,
  };
}