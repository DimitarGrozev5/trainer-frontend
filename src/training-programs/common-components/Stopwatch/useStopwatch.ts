import { useCallback, useEffect, useMemo, useState } from 'react';

type seconds = number;
type UTCTime = number;

export const useStopwatch = () => {
  const [startTimestamp, setStartTimestamp] = useState<UTCTime>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buildup, setBuildup] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: number;

    if (running) {
      timer = requestAnimationFrame(() => {
        const now: UTCTime = new Date().getTime();
        const dt: seconds = (now - startTimestamp) / 1000;
        setCurrentTime(dt + buildup);
      });
    }

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [buildup, running, startTimestamp]);

  const onStart = () => {
    const now: UTCTime = new Date().getTime();
    setStartTimestamp(now);
    setRunning(true);
  };

  const onPause = useCallback(() => {
    const now: UTCTime = new Date().getTime();
    const dt: seconds = (now - startTimestamp) / 1000;
    setBuildup(dt + buildup);
    setRunning(false);
  }, [buildup, startTimestamp]);

  const onReset = () => {
    setRunning(false);
    setBuildup(0);
  };

  const result = useMemo(
    () => ({
      time: currentTime,
      running,
      onStart,
      onPause,
      onReset,
    }),
    [currentTime, onPause, running]
  );

  return result;
};
