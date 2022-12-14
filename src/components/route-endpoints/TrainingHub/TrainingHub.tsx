import { compareAsc } from 'date-fns';
import { useState } from 'react';
import { useGetAllPrograms } from '../../../hooks/programs-hooks/useGetAllPrograms';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { programsActions } from '../../../redux-store/programsSlice';
import { ProgramId, TPActive } from '../../../training-programs/data-types';
import { SessionDate } from '../../../training-programs/extra-types';
import { roundDate } from '../../../util/date';
import Calendar from '../../Calendar/Calendar';
import Button from '../../UI-elements/Button/Button';
import Card from '../../UI-elements/Card/Card';
import OverlayModal from '../../UI-elements/OverlayModal/OverlayModal';
import styles from './TrainingHub.module.css';

const TrainingHub = () => {
  const dispatch = useAppDispatch();

  // Get programs
  const { getProgram } = useGetAllPrograms();

  // State for controlling the selected day
  const [selectedDate, setSelectedDate] = useState(roundDate(new Date()));

  // Get programs for selected date
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
    const programOrNull = getProgram(id);
    if (!programOrNull || !programOrNull.active) {
      return;
    }
    const program = programOrNull as TPActive;

    const nextState = program.getNextState(program.state, 'skip');

    dispatch(
      programsActions.updateThunk({
        id: program.id,
        state: nextState,
        version: program.version,
        achieved: 'skip',
      })
    );
  };

  const [showTodayModal, setShowTodayModal] = useState(false);

  const changeDateHandler = (date: Date) => {
    setSelectedDate(date);
    setShowTodayModal(true);
  };

  return (
    <>
      <Card className={styles.calendar}>
        <Calendar
          selectedDate={selectedDate}
          onChangeDate={changeDateHandler}
        />
      </Card>
      {/* <Card className={styles.today}> */}
      <OverlayModal
        show={showTodayModal}
        onClose={setShowTodayModal.bind(null, false)}
      >
        <h1>Today:</h1>
        <ul>
          {today.map((s) => {
            const sessionDate = getProgram(s.id)?.state?.sessionDate;
            const sessionDateUTC = sessionDate || SessionDate.from(new Date(0));
            return (
              <li key={s.name} className={styles.scheduled}>
                <h2>{s.name}</h2>
                <div className={styles['scheduled__desc']}>{s.sessionDesc}</div>
                {compareAsc(
                  SessionDate.toDate(sessionDateUTC),
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
            );
          })}
        </ul>
      </OverlayModal>
      {/* </Card> */}
    </>
  );
};

export default TrainingHub;
