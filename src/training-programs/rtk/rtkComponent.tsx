import { useEffect, useMemo, useState } from 'react';

import Button from '../../components/UI-elements/Button/Button';
import Card from '../../components/UI-elements/Card/Card';
import { H1, H2 } from '../common-components/Headings/H';
import Info from '../common-components/Info/Info';
import styles from './Styles.module.css';
import { SessionProps } from '../data-types';
import { balisticProgression, grindProgression } from './rtk';
import {
  progressionIndex,
  RTKIntent,
  WeightCombo,
  WeightVariations,
} from './rtk-types';
import { useStopwatch } from '../common-components/Stopwatch/useStopwatch';
import Stopwatch from '../common-components/Stopwatch/Stopwatch';

export const RTKComponent = ({
  program,
  onAchievedChanged,
}: SessionProps<'rtk'>) => {
  // Get details from last session
  const {
    currentBlock,
    sessionInBlock,

    nextGrindGoal,
    lastThreeGrindTimes,
    nextBalisticGoal,
    lastThreeBalisticTimes,

    grindWeights,
    balisticWeights,
    bestGrindTest,
    bestBalistic,
  } = program.state;

  // Session type - 0 - light; 1 - medium; 2 - heavy
  const sessionType = sessionInBlock % 3;
  const sessionTypes = ['Light', 'Medium', 'Heavy'];

  // Ladder params
  const fullLadder = useMemo(() => {
    return currentBlock === 'grind'
      ? grindProgression[nextGrindGoal]
      : balisticProgression[nextBalisticGoal];
  }, [currentBlock, nextBalisticGoal, nextGrindGoal]);

  const sessionLadder = useMemo(() => {
    const drop = currentBlock === 'grind' ? 1 : 2;
    switch (sessionType) {
      case 0:
        return fullLadder.map((r) => ({ topSet: r.topSet - 2 * drop }));
      case 1:
        return fullLadder.map((r) => ({ topSet: r.topSet - drop }));
      case 2:
        return fullLadder;

      default:
        return fullLadder;
    }
  }, [currentBlock, fullLadder, sessionType]);

  const sessionVolume = sessionLadder.reduce((volume, rung) => {
    return volume + ((rung.topSet + 1) * rung.topSet) / 2;
  }, 0);

  const allBellWeights =
    currentBlock === 'grind' ? grindWeights : balisticWeights;
  const sessionWeights =
    sessionType === 0
      ? allBellWeights.light
      : sessionType === 1
      ? allBellWeights.medium
      : allBellWeights.heavy;

  // State for session setup ot execution
  // 0 - overview
  // 1 - do session
  // 2 - test
  const [sessionState, setSessionState] = useState(0);

  const startSessionHandler = () => {
    setSessionState(1);
  };
  const startTestHandler = () => {
    setSessionState(2);
  };

  // Setup achievment
  const [achieved, setAchieved] = useState<progressionIndex>(
    currentBlock === 'grind' ? nextGrindGoal : nextBalisticGoal
  );
  const [time, setTime] = useState(0);
  const [nextWeights, setNextWeights] = useState<WeightVariations>(
    currentBlock === 'grind' ? grindWeights : balisticWeights
  );
  const [intent, setIntent] = useState<RTKIntent>('stay');

  const [test, setTest] = useState<
    | {
        block: 'grind';
        testAchieved: WeightCombo;
      }
    | {
        block: 'balistic';
        testAchieved: WeightCombo & { reps: number };
      }
  >(
    currentBlock === 'grind'
      ? {
          block: 'grind',
          testAchieved: bestGrindTest,
        }
      : { block: 'balistic', testAchieved: bestBalistic }
  );

  useEffect(() => {
    if (sessionState === 1) {
      onAchievedChanged({
        achieved,
        time,
        nextWeights,
        intent,
      });
    } else if (sessionState === 2) {
      onAchievedChanged(test);
    }
  }, [
    achieved,
    intent,
    nextWeights,
    onAchievedChanged,
    sessionState,
    test,
    time,
  ]);

  const stopwatchProps = useStopwatch();

  return (
    <>
      {sessionState === 0 && (
        <>
          <H1>Session for today:</H1>
          <Card>
            <H2>
              {currentBlock === 'grind' ? 'Grind' : 'Balistic'} Block{' '}
              {sessionTypes[sessionType]} session:
            </H2>
            <Info>Ladders: {sessionLadder.length}</Info>
            <Info>Max reps in Rung: {sessionLadder[0].topSet}</Info>
            <Info>Session target Volume: {sessionVolume}</Info>
            <Info>
              Kettlebell Weights: {sessionWeights.left}kg/{sessionWeights.right}
              kg
            </Info>
          </Card>
          <Card>
            <H2>Exercises:</H2>
            {currentBlock === 'grind' && (
              <>
                <Info>Ladders of Presses (Snatch before first press)</Info>
                <Info>Do 5 Squats after each top Rung</Info>
                <Info>Do 2x20 Deadlifts at the end</Info>
              </>
            )}
            {currentBlock === 'balistic' && (
              <>
                {sessionType === 0 ? (
                  <>
                    <Info>Ladders of Viking Push Press</Info>
                    <Info>
                      Do 2-3x10-20 per arm of Front or Side rise Snatches
                    </Info>
                  </>
                ) : (
                  <Info>Ladders of Clean & Jerk</Info>
                )}
              </>
            )}
          </Card>
          <Card className={styles.control}>
            <Button stretch onClick={startSessionHandler}>
              Start Session (starts in 10 seconds)
            </Button>
            {sessionType === 2 && (
              <>
                <Button stretch onClick={startTestHandler}>
                  Start Test
                </Button>
              </>
            )}
          </Card>
          <Card>
            <H2>Best Achivements:</H2>
            <Info>
              Best Press: {bestGrindTest.left}kg/{bestGrindTest.right}kg
            </Info>
            <Info>
              Best Clean and Jerk: {bestBalistic.reps} reps with{' '}
              {bestBalistic.left}kg/{bestBalistic.right}kg
            </Info>
          </Card>
        </>
      )}
      {sessionState === 1 && (
        <>
          <Card>
            <Stopwatch {...stopwatchProps} />
          </Card>
          <Card>
            
          </Card>
        </>
      )}
      {sessionState === 2 && <></>}
    </>
  );
};
