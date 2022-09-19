import { useEffect, useState } from 'react';
import { add, isEqual } from 'date-fns';

import Input from '../../components/UI-elements/Input/Input';
import { CircularArray } from '../../util/array';
import { roundDate } from '../../util/date';
import { InitProps, TP } from '../data-types';
import { QDComponent } from './qdComponent';
import { qdAchieved, qdInit, qdState } from './qd-types';
import { SessionDate } from '../extra-types';

const schedule = [2, 2, 3];

export const quickDead: TP<'quick-dead', true> = {
  id: 'quick-dead',
  active: false,
  state: {} as qdState,
  version: '',

  name: 'Q&D',
  shortDesc: 'The Quick and The Dead training progam by Pavel',
  longDesc:
    'This training protocol aims to build your strength endurance and mitochondria in your fast twitch muscle fibers. It consists of two exercices - swing and viking push press, that are performed as explosively as possible, preferably in around a second per rep.',

  InitComponent: ({ value, onChange }: InitProps<'quick-dead'>) => {
    const [startToday, setStartToday] = useState(true);
    const [startDate, setStartDate] = useState(roundDate(new Date()));

    // Run on first try to init the data
    useEffect(() => {
      onChange({ startDate: SessionDate.from(startDate) });
      // eslint-disable-next-line
    }, []);

    // Reset startDate to today when startToday is false
    useEffect(() => {
      !startToday && setStartDate(roundDate(new Date()));
    }, [startToday]);

    // Update value when settings change
    useEffect(() => {
      if (
        !value.startDate ||
        !isEqual(SessionDate.toDate(value.startDate), startDate)
      ) {
        onChange({
          startDate: SessionDate.from(roundDate(startDate)),
        });
      }
    }, [startDate, value.startDate, onChange]);

    return (
      <>
        <div>
          You will be performing two exercises - the Swing, with one arm or two
          arms and the Viking Push Press with one arm. <br />
          Pick a weight that allows you to be explosive. That means that your 10
          rep sets should last as little as possible, but definitely less than
          15 seconds. <br />
          You will be training three times a week. The exact rep and set schemes
          will be decided on the day.
        </div>
        <Input
          label="Start today"
          type="checkbox"
          value={startToday}
          onChange={setStartToday}
        />
        {!startToday && (
          <Input
            label="Select start Date:"
            type="date"
            value={startDate}
            onChange={setStartDate}
          />
        )}
      </>
    );
  },
  getInitData: (val: qdInit): qdState => {
    return {
      sessionDate: val.startDate,
      scheduleIndex: 0,
      lastVolume: 100,
    };
  },

  getDescFromState: (state: qdState): string => {
    return 'Will be decided on the day';
  },
  getNextState: (
    prevState: qdState,
    achieved: qdAchieved | 'skip'
  ): qdState => {
    const skip = achieved === 'skip';

    const {
      sessionDate: sessionDateUtc,
      scheduleIndex,
      lastVolume,
    } = prevState;

    /// Calculate next session date
    // Convert sessionDate to Date object
    const sessionDate = SessionDate.toDate(sessionDateUtc);

    // Convert schedule to CircularArray
    const schedulePlan = new CircularArray<number>(schedule, scheduleIndex);

    // Select the base date
    const fromDate = skip ? sessionDate : new Date();

    // Calculate next session date
    const nextSessionDate = roundDate(
      add(fromDate, { days: schedulePlan.i(0) })
    );

    // Calculate next schedule index
    const nextScheduleIndex = schedulePlan.getIndex(+1);

    return {
      sessionDate: SessionDate.from(nextSessionDate),
      scheduleIndex: nextScheduleIndex,
      lastVolume: skip ? lastVolume : achieved.volume,
    };
  },
  getNextScheduleState: function (prevState: qdState): qdState {
    const { sessionDate: sessionDateUtc, scheduleIndex } = prevState;

    /// Calculate next session date
    // Convert sessionDate to Date object
    const sessionDate = SessionDate.toDate(sessionDateUtc);

    // Convert schedule to CircularArray
    const schedulePlan = new CircularArray<number>(schedule, scheduleIndex);

    // Calculate next session date
    const nextSessionDate = roundDate(
      add(sessionDate, { days: schedulePlan.i(0) })
    );

    // Calculate next schedule index
    const nextScheduleIndex = schedulePlan.getIndex(+1);

    return {
      sessionDate: SessionDate.from(nextSessionDate),
      scheduleIndex: nextScheduleIndex,
      lastVolume: 40,
    };
  },

  SessionComponent: QDComponent,
};
