import React, { useEffect, useImperativeHandle, useState } from "react";
import Button from "../../../components/UI-elements/Button/Button";
import { formatDurationClock, formatDurationText } from "../../../util/time";

import styles from "./CountdownTimer.module.css";

type seconds = number;
type UTCTime = number;

interface Props {
  initTime: seconds;
  onZero?: () => void;
  step?: seconds;
}

export interface CountdownHandle {
  start: () => void;
  pause: () => void;
  restart: () => void;
}

const CountdownTimer: React.ForwardRefRenderFunction<CountdownHandle, Props> = (
  { initTime, onZero, step = 30 },
  ref
) => {
  // Store the desired timer duration
  const [timerInitDuration, setTimerInitDuration] = useState(initTime);

  // Store the current timer time
  const [currentTime, setCurrentTime] = useState(initTime);

  // Store the values, when the timer was started
  const [startTimestamp, setStartTimestamp] = useState<UTCTime | false>(false);
  const [startTime, setStartTime] = useState<seconds | false>(false);

  const timeText = formatDurationClock(currentTime);
  const stepText = formatDurationText(step);

  // Control functions
  const start = () => {
    const now = new Date().getTime();
    setStartTimestamp(now);
    setStartTime(currentTime);
  };
  const pause = () => {
    setStartTimestamp(false);
    setStartTime(false);
  };
  const restart = () => {
    setCurrentTime(timerInitDuration);

    const now = new Date().getTime();
    setStartTimestamp(now);
    setStartTime(timerInitDuration);
  };

  useImperativeHandle(ref, () => ({ start, pause, restart }));

  // Handle clock tick
  useEffect(() => {
    let timer: number;

    if (startTimestamp && startTime) {
      timer = requestAnimationFrame(() => {
        const now: UTCTime = new Date().getTime();
        const dt: seconds = (now - startTimestamp) / 1000;
        setCurrentTime(startTime - dt);

        if (startTime - dt <= 0) {
          setStartTimestamp(false);
          setStartTime(false);
          setCurrentTime(0);
          onZero && onZero();
        }
      });
    }

    return () => cancelAnimationFrame(timer);
  }, [startTimestamp, startTime, currentTime, onZero]);

  const setTimer = (dt: seconds) => () => {
    setStartTime((st) => st !== false && st + dt);
    setCurrentTime((st) => st + dt);
    setTimerInitDuration((t) => t + dt);
  };

  return (
    <div>
      <div className={styles.clock}>{timeText}</div>
      <div className={styles.controls}>
        <Button onClick={setTimer(-step)}>{`-${stepText}`}</Button>
        <Button stretch onClick={startTimestamp === false ? start : pause}>
          {startTimestamp === false ? "Start" : "Pause"}
        </Button>
        <Button onClick={setTimer(step)}>{`+${stepText}`}</Button>
      </div>
    </div>
  );
};

export default React.forwardRef(CountdownTimer);
