import React, { useEffect, useImperativeHandle, useState } from 'react';
import Button from '../../../components/UI-elements/Button/Button';
import { formatDurationClock, formatDurationText } from '../../../util/time';

import styles from './Stopwatch.module.css';

type seconds = number;

interface Props {
  time: seconds;
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Stopwatch: React.FC<Props> = ({
  time,
  running,
  onStart,
  onPause,
  onReset,
}) => {
  const timeText = formatDurationClock(time);

  return (
    <div>
      <div className={`${styles.clock} ${time > 60 * 60 ? styles.small : ''}`}>
        {timeText}
      </div>
      <div className={styles.controls}>
        <Button stretch onClick={running ? onPause : onStart}>
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button stretch onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;
