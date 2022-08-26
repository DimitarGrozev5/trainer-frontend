import React, { useEffect, useState } from "react";
import Button from "../../../components/UI-elements/Button/Button";

import styles from "./CountdownTimer.module.css";

type seconds = number;

interface Props {
  time: number;
  onTick: (val: number) => void;
  step?: seconds;
}

const CountdownTimer: React.FC<Props> = ({ time, onTick, step = 30 }) => {
  const [startTime] = useState(new Date().getTime());

  const timeText = time;
  return (
    <div>
      <div className={styles.clock}>{timeText}</div>
      <div className={styles.controls}>
        <Button>{`-${step}s`}</Button>
        <Button>Pause</Button>
        <Button>{`+${step}s`}</Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
