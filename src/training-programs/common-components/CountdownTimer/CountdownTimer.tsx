import React, { useEffect, useState } from "react";
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

const CountdownTimer: React.FC<Props> = ({
  initTime,
  onZero = () => {},
  step = 30,
}) => {
  const [currentTime, setCurrentTime] = useState(initTime);
  const [startTimestamp, setStartTimestamp] = useState<UTCTime | false>(false);

  const timeText = formatDurationClock(currentTime);
  const stepText = formatDurationText(step);

  return (
    <div>
      <div className={styles.clock}>{timeText}</div>
      <div className={styles.controls}>
        <Button>{`-${stepText}`}</Button>
        <Button>Pause</Button>
        <Button>{`+${stepText}`}</Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
