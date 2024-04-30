import { useState, useEffect, useRef } from 'react';

const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [countdownActive, setCountdownActive] = useState(false);

  const startCountdown = async (duration: number) => {
    resetTimer();
    setPercentageComplete(0);
    setTimeLeft(duration);
    setCountdownActive(true);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (countdownActive) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          let newPercentageComplete = 0;
          if (timeLeft !== 0) {
            newPercentageComplete = ((timeLeft - newTimeLeft) / timeLeft) * 100;
          }
          setPercentageComplete(newPercentageComplete);
          if (newTimeLeft <= 0) {
            clearInterval(intervalId);
            setCountdownActive(false);
            setTimeLeft(0);
            setPercentageComplete(100);
          }
          return newTimeLeft;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [countdownActive]);

  const resetTimer = () => {
    setTimeLeft(0);
    setPercentageComplete(0);
  };

  return { timeLeft, percentageComplete, startCountdown, setTimeLeft };
};

export default useTimer;
