import { compareAsc } from 'date-fns';
import { useState } from 'react';
import { useGetAllPrograms } from '../../../hooks/programs-hooks/useGetAllPrograms';
import {
  populateProgramFromState,
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/redux-hooks';
import { programsActions } from '../../../redux-store/programsSlice';
import { ProgramId } from '../../../training-programs/data-types';
import { roundDate } from '../../../util/date';
import Calendar from '../../Calendar/Calendar';
import Button from '../../UI-elements/Button/Button';
import Card from '../../UI-elements/Card/Card';
import styles from './TrainingHub.module.css';

const TrainingHub = () => {
  const dispatch = useAppDispatch();

  // Get programs
  const workouts = useAppSelector((state) => state.programs);
  // const { allPrograms: programs } = useGetAllPrograms();

  // State for controlling the selected day
  const [selectedDate, setSelectedDate] = useState(roundDate(new Date()));

  // Get programs for selected date
  // const today = scheduleService(selectedDate);
  const today = useAppSelector((state) =>
    Object.entries(state.scheduleCache).flatMap(([, schedule]) => {
      if (
        selectedDate.getTime() in schedule &&
        schedule[selectedDate.getTime()]
      ) {
        const sc = schedule[selectedDate.getTime()];
        return sc ? sc : [];
      }
      return [];
    })
  );

  const skipSessionHandler = (id: ProgramId) => async () => {
    const program = populateProgramFromState(id, workouts);

    const nextState = program.getNextState(
      program.state,
      {},
      { forceProgress: false, fromToday: false }
    );

    dispatch(
      programsActions.update({
        id: program.id,
        state: nextState,
        achieved: { force: true },
        version: program.version,
      })
    );
  };

  return (
    <>
      <Card className={styles.calendar}>
        <Calendar selectedDate={selectedDate} onChangeDate={setSelectedDate} />
      </Card>
      <Card className={styles.today}>
        <h1>Today:</h1>
        <ul>
          {today.map((s) => (
            <li key={s.name} className={styles.scheduled}>
              <h2>{s.name}</h2>
              <div className={styles['scheduled__desc']}>{s.sessionDesc}</div>
              {compareAsc(
                workouts.byId[s.id].state.sessionDate,
                selectedDate
              ) === 0 && (
                <div className={styles['scheduled__ctrl']}>
                  <Button onClick={skipSessionHandler(s.id)} plain>
                    Skip
                  </Button>
                  <Button to={`/active/${s.id}`} stretch>
                    Start
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default TrainingHub;
