import { useEffect, useState } from 'react';
import { add, isEqual } from 'date-fns';

import Input from '../../components/UI-elements/Input/Input';
import { CircularArray } from '../../util/array';
import { roundDate } from '../../util/date';
import { InitProps, TP } from '../data-types';
import { QDComponent } from './rtkComponent';
import {
  Ladder,
  rtkAchieved,
  rtkInit,
  rtkState,
  WeightVariations,
} from './rtk-types';
import { SessionDate } from '../extra-types';
import { H2, H3 } from '../common-components/Headings/H';

const schedule = [2, 2, 3];
const grindProgression: Ladder[] = [
  [{ topSet: 3 }, { topSet: 3 }, { topSet: 3 }],
  [{ topSet: 3 }, { topSet: 3 }, { topSet: 3 }, { topSet: 3 }],
  [{ topSet: 3 }, { topSet: 3 }, { topSet: 3 }, { topSet: 3 }, { topSet: 3 }],
  [{ topSet: 4 }, { topSet: 3 }, { topSet: 3 }, { topSet: 3 }, { topSet: 3 }],
  [{ topSet: 4 }, { topSet: 4 }, { topSet: 3 }, { topSet: 3 }, { topSet: 3 }],
  [{ topSet: 4 }, { topSet: 4 }, { topSet: 4 }, { topSet: 3 }, { topSet: 3 }],
  [{ topSet: 4 }, { topSet: 4 }, { topSet: 4 }, { topSet: 4 }, { topSet: 3 }],
  [{ topSet: 4 }, { topSet: 4 }, { topSet: 4 }, { topSet: 4 }, { topSet: 4 }],
  [{ topSet: 5 }, { topSet: 4 }, { topSet: 4 }, { topSet: 4 }, { topSet: 4 }],
  [{ topSet: 5 }, { topSet: 5 }, { topSet: 4 }, { topSet: 4 }, { topSet: 4 }],
  [{ topSet: 5 }, { topSet: 5 }, { topSet: 5 }, { topSet: 4 }, { topSet: 4 }],
  [{ topSet: 5 }, { topSet: 5 }, { topSet: 5 }, { topSet: 5 }, { topSet: 4 }],
  [{ topSet: 5 }, { topSet: 5 }, { topSet: 5 }, { topSet: 5 }, { topSet: 5 }],
];
const balisticProgression: Ladder[] = [
  [{ topSet: 6 }, { topSet: 6 }, { topSet: 6 }],
  [{ topSet: 6 }, { topSet: 6 }, { topSet: 6 }, { topSet: 6 }],
  [{ topSet: 6 }, { topSet: 6 }, { topSet: 6 }, { topSet: 6 }, { topSet: 6 }],
  [{ topSet: 8 }, { topSet: 6 }, { topSet: 6 }, { topSet: 6 }, { topSet: 6 }],
  [{ topSet: 8 }, { topSet: 8 }, { topSet: 6 }, { topSet: 6 }, { topSet: 6 }],
  [{ topSet: 8 }, { topSet: 8 }, { topSet: 8 }, { topSet: 6 }, { topSet: 6 }],
  [{ topSet: 8 }, { topSet: 8 }, { topSet: 8 }, { topSet: 8 }, { topSet: 6 }],
  [{ topSet: 8 }, { topSet: 8 }, { topSet: 8 }, { topSet: 8 }, { topSet: 8 }],
  [{ topSet: 10 }, { topSet: 8 }, { topSet: 8 }, { topSet: 8 }, { topSet: 8 }],
  [{ topSet: 10 }, { topSet: 10 }, { topSet: 8 }, { topSet: 8 }, { topSet: 8 }],
  [
    { topSet: 10 },
    { topSet: 10 },
    { topSet: 10 },
    { topSet: 8 },
    { topSet: 8 },
  ],
  [
    { topSet: 10 },
    { topSet: 10 },
    { topSet: 10 },
    { topSet: 10 },
    { topSet: 8 },
  ],
  [
    { topSet: 10 },
    { topSet: 10 },
    { topSet: 10 },
    { topSet: 10 },
    { topSet: 10 },
  ],
];

export const RTK: TP<'rtk', true> = {
  id: 'rtk',
  active: false,
  state: {} as rtkState,
  version: '',

  name: 'RTK',
  shortDesc: 'Return of The Kettlebell',
  longDesc:
    'A hard kettlebell program that is ment to build strength and muscle. It requires a lot of dedication and a lot of hard work and consistency.',

  InitComponent: ({ value, onChange }: InitProps<'rtk'>) => {
    const [startToday, setStartToday] = useState(true);
    const [startDate, setStartDate] = useState(roundDate(new Date()));

    const [grindWeights, setGrindWeights] = useState<WeightVariations>({
      heavy: { left: 0, right: 0 },
      medium: { left: 0, right: 0 },
      light: { left: 0, right: 0 },
    });
    const [balisticWeights, setBalisticWeights] = useState<WeightVariations>({
      heavy: { left: 0, right: 0 },
      medium: { left: 0, right: 0 },
      light: { left: 0, right: 0 },
    });

    const changeGrinds =
      (session: 'heavy' | 'medium' | 'light', side: 'left' | 'right') =>
      (newVal: string) => {
        setGrindWeights((w) => ({
          ...w,
          [session]: {
            ...w[session],
            [side]: +newVal,
          },
        }));
      };
    const changeBalistics =
      (session: 'heavy' | 'medium' | 'light', side: 'left' | 'right') =>
      (newVal: string) => {
        setBalisticWeights((w) => ({
          ...w,
          [session]: {
            ...w[session],
            [side]: +newVal,
          },
        }));
      };

    // Run on first try to init the data
    useEffect(() => {
      onChange({
        startDate: SessionDate.from(startDate),
        grindWeights: {
          heavy: {
            left: 0,
            right: 0,
          },
          medium: {
            left: 0,
            right: 0,
          },
          light: {
            left: 0,
            right: 0,
          },
        },
        balisticWeights: {
          heavy: {
            left: 0,
            right: 0,
          },
          medium: {
            left: 0,
            right: 0,
          },
          light: {
            left: 0,
            right: 0,
          },
        },
      });
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
          grindWeights,
          balisticWeights,
        });
      }
    }, [startDate, value.startDate, onChange, grindWeights, balisticWeights]);

    return (
      <>
        <div>Read the book dude. Return of The Kettlebell</div>
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
        <H2>Grind block weights</H2>
        <H3>Heavy session</H3>
        <Input
          label="Left"
          type="text"
          value={grindWeights.heavy.left.toString()}
          onChange={changeGrinds('heavy', 'left')}
        />
        <Input
          label="Right"
          type="text"
          value={grindWeights.heavy.right.toString()}
          onChange={changeGrinds('heavy', 'right')}
        />
        <H3>Medium session</H3>
        <Input
          label="Left"
          type="text"
          value={grindWeights.medium.left.toString()}
          onChange={changeGrinds('medium', 'left')}
        />
        <Input
          label="Right"
          type="text"
          value={grindWeights.medium.right.toString()}
          onChange={changeGrinds('medium', 'right')}
        />
        <H3>Light session</H3>
        <Input
          label="Left"
          type="text"
          value={grindWeights.light.left.toString()}
          onChange={changeGrinds('light', 'left')}
        />
        <Input
          label="Right"
          type="text"
          value={grindWeights.light.right.toString()}
          onChange={changeGrinds('light', 'right')}
        />

        <H2>Balistic block weights</H2>
        <H3>Heavy session</H3>
        <Input
          label="Left"
          type="text"
          value={balisticWeights.heavy.left.toString()}
          onChange={changeBalistics('heavy', 'left')}
        />
        <Input
          label="Right"
          type="text"
          value={balisticWeights.heavy.right.toString()}
          onChange={changeBalistics('heavy', 'right')}
        />
        <H3>Medium session</H3>
        <Input
          label="Left"
          type="text"
          value={balisticWeights.medium.left.toString()}
          onChange={changeBalistics('medium', 'left')}
        />
        <Input
          label="Right"
          type="text"
          value={balisticWeights.medium.right.toString()}
          onChange={changeBalistics('medium', 'right')}
        />
        <H3>Light session</H3>
        <Input
          label="Left"
          type="text"
          value={balisticWeights.light.left.toString()}
          onChange={changeBalistics('light', 'left')}
        />
        <Input
          label="Right"
          type="text"
          value={balisticWeights.light.right.toString()}
          onChange={changeBalistics('light', 'right')}
        />
      </>
    );
  },
  getInitData: (val: rtkInit): rtkState => {
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
