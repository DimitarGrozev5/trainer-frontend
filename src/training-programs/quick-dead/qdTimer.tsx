import React, { useEffect, useState } from 'react';

import styles from './Styles.module.css';
import { qdAchieved, qdVolume } from './qd-types';
import Card from '../../components/UI-elements/Card/Card';

const getArrFromN = (n: number) => Array(n).fill(0);

const exerciseGenerator = function* (): Generator<string, any, undefined> {
  let one = true;
  while (true) {
    if (one) {
      yield 'Swing';
    } else {
      yield 'Viking Push Press';
    }
    one = !one;
  }
};

const setGenerator = (time: number, repCount: number, exercise: string) => {
  return { time, caption: `Do ${repCount} reps of ${exercise}` };
};

const seriesGenerator = (baseTime: number, repScheme: number) => {
  const interval = repScheme === 5 ? 30 : 60;
  const sets = repScheme === 5 ? 4 : 2;

  const exerciseGen = exerciseGenerator();
  let exercise: string = exerciseGen.next().value;

  const series1 = getArrFromN(sets).map((_, i) =>
    setGenerator(baseTime + interval * i, repScheme, exercise)
  );

  exercise = exerciseGen.next().value;
  const series2 = getArrFromN(sets).map((_, i) =>
    setGenerator(baseTime + 3 * 60 + interval * i, repScheme, exercise)
  );

  return [...series1, ...series2];
};

const schemeGenerator = function* (
  repScheme: number
): Generator<number, any, undefined> {
  let one = true;
  while (true) {
    if (repScheme === 15) {
      if (one) {
        yield 5;
      } else {
        yield 10;
      }
      one = !one;
    } else {
      yield repScheme;
    }
  }
};

const sessionGenerator = (repScheme: number, volume: number) => {
  const repGen = schemeGenerator(repScheme);

  const series = getArrFromN(volume / 20).flatMap((_, i) => {
    const scheme: number = repGen.next().value;
    return seriesGenerator(6 * 60 * i, scheme);
  });

  return series;
};

interface Props {
  repScheme: number;
  volume: qdVolume;
  onAchievedChanged: (val: qdAchieved) => void;
}

interface Set {
  time: number;
  caption: string;
}

export const QDTimer: React.FC<Props> = ({
  repScheme,
  volume,
  onAchievedChanged,
}) => {
  // Setup sets state
  const [sets, setSets] = useState<Set[] | null>(null);

  // Calculate sets on first render
  useEffect(() => {
    const session = sessionGenerator(repScheme, volume);

    setSets(session);
  }, [repScheme, volume]);

  const filterSets = (dt: number) => (sets: Set[] | null) =>
    sets && [...sets].filter((s) => s.time > dt - 10);

  // StopWatch setup
  const [startTime] = useState(new Date().getTime());

  const [timer, setTimer] = useState(startTime);

  const [paused] = useState(false);

  useEffect(() => {
    let ticker: NodeJS.Timeout;
    if (!paused) {
      ticker = setTimeout(() => {
        const now = new Date().getTime();
        setTimer(now);
        setSets(filterSets((now - startTime) / 1000 - 10));
      }, 100);
    }

    return () => clearTimeout(ticker);
  }, [timer, paused, startTime]);

  useEffect(() => {
    const goalAchieved = sets !== null && sets.length === 0;

    if (goalAchieved) {
      const achieved = { volume };
      onAchievedChanged(achieved);
    }
  }, [sets, onAchievedChanged, volume]);

  return (
    <>
      {/* <Card className={styles.control}>
        <Button stretch onClick={setPaused.bind(null, (p) => !p)}>
          {paused ? 'Continue' : 'Pause'}
        </Button>
      </Card> */}
      <FormatTime startTime={startTime} currentTime={timer} />
      <Card>
        <ul className={styles.sets}>
          {sets &&
            sets.map((set, i) => (
              <li key={i}>
                {!i &&
                  `(${set.time - Math.floor((timer - startTime) / 1000 - 10)})`}
                {set.caption}
              </li>
            ))}
        </ul>
      </Card>
    </>
  );
};

function FormatTime({
  startTime,
  currentTime,
}: {
  startTime: number;
  currentTime: number;
}) {
  // The timer start from -10s
  const time = (currentTime - startTime) / 1000 - 10;

  let mOnly = Math.floor(time / 60);
  let s = Math.floor(time - mOnly * 60 + 100)
    .toString()
    .substring(1);
  let m = (mOnly + 100).toString().substring(1);

  if (time < 0) {
    mOnly = Math.ceil(time / 60);
    s = Math.floor(time - mOnly * 60 - 100)
      .toString()
      .substring(2);
    m = (mOnly - 100).toString().substring(2);
  }

  return (
    <Card className={`${styles.clock} ${time < 0 ? styles.small : ''}`}>
      <div className={styles['clock-nums']}>
        {time < 0 && '-'}
        {m}:{s}
      </div>
    </Card>
  );
}

export default FormatTime;
