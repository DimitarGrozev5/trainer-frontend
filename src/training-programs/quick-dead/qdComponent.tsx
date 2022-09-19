import { useState } from 'react';
import _ from 'lodash';

import Button from '../../components/UI-elements/Button/Button';
import Card from '../../components/UI-elements/Card/Card';
import { H1, H2 } from '../common-components/Headings/H';
import Info from '../common-components/Info/Info';
import styles from './Styles.module.css';
import { SessionProps } from '../data-types';
import { qdVolume } from './qd-types';
import { QDTimer } from './qdTimer';

const dice = (exclude: number[]): number => {
  let rnd = _.random(1, 6, false);
  while (exclude.includes(rnd)) {
    rnd = _.random(1, 6, false);
  }
  return rnd;
};

const volumeDice = {
  40: [1],
  60: [2, 3],
  80: [4, 5],
  100: [6],
};
const repSchemeFromDice: number[] = [0, 5, 5, 15, 15, 10, 10];
const volumeFromDice: qdVolume[] = [40, 40, 60, 60, 80, 80, 100];

export const QDComponent = ({
  program,
  onAchievedChanged,
}: SessionProps<'quick-dead'>) => {
  // Get details from last session
  const { lastVolume } = program.state;

  // Function to calculate random session
  const randWorkout = (lastVolume: qdVolume) => {
    const nextRepSchemeRoll = dice([]);
    const nextVolumeRoll = dice(volumeDice[lastVolume]);

    const repScheme = repSchemeFromDice[nextRepSchemeRoll];
    const volume = volumeFromDice[nextVolumeRoll];

    return { repScheme, volume };
  };

  // State for session setup ot execution
  const [sessionStarted, setSessionStarted] = useState(false);

  // State for session parameters
  const [w, setW] = useState(randWorkout(lastVolume));

  const changeWHandler = () => {
    setW(randWorkout(lastVolume));
  };
  const offDayHandler = () => {
    setW({ repScheme: 5, volume: 40 });
  };
  const startSessionHandler = () => {
    setSessionStarted(true);
  };

  return (
    <>
      {!sessionStarted && (
        <>
          <H1>Session for today:</H1>
          <Card>
            <H2>Total daily reps:</H2>
            <Info>Total reps: {w.volume}</Info>
            <Info>Number of series: {w.volume / 20}</Info>
            <Info>Session duration: {(w.volume / 20) * 6} min</Info>
          </Card>
          <Card>
            <H2>Reps and Sets within Series:</H2>
            {w.repScheme === 5 && <Info>Reps/sets: 5/4</Info>}
            {w.repScheme === 10 && <Info>Reps/sets: 10/2</Info>}
            {w.repScheme === 15 && (
              <Info>Alternate series of 5/4 and 10/2</Info>
            )}
          </Card>
          <Card className={styles.control}>
            <Button stretch onClick={changeWHandler}>
              Reshuffle
            </Button>
            <Button stretch onClick={offDayHandler}>
              I am having an off day
            </Button>
            <Button stretch onClick={startSessionHandler}>
              Start Session (starts in 10 seconds)
            </Button>
          </Card>
        </>
      )}
      {sessionStarted && (
        <QDTimer
          repScheme={w.repScheme}
          volume={w.volume}
          onAchievedChanged={onAchievedChanged}
        />
      )}
    </>
  );
};
