import { compareAsc } from "date-fns";
import { useState } from "react";
import {
  populateProgramFromState,
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux-hooks";
import { useScheduleService } from "../../../hooks/ScheduleService/useScheduleService";
import { useHttpClient } from "../../../hooks/useHttpClient";
import { programsActions } from "../../../redux-store/programsSlice";
import { ProgramId } from "../../../training-programs/data-types";
import { roundDate } from "../../../util/date";
import Calendar from "../../Calendar/Calendar";
import Button from "../../UI-elements/Button/Button";
import Card from "../../UI-elements/Card/Card";
import LoadingSpinner from "../../UI-elements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../UI-elements/Modal/ErrorModal";
import styles from "./TrainingHub.module.css";

const TrainingHub = () => {
  const scheduleService = useScheduleService();
  const dispatch = useAppDispatch();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  // Get workouts
  const workouts = useAppSelector((state) => state.programs);

  // State for controlling the selected day
  const [selectedDate, setSelectedDate] = useState(roundDate(new Date()));

  // Get workouts for selected date
  const today = scheduleService(selectedDate);

  const skipSessionHandler = (id: ProgramId) => async () => {
    const workout = populateProgramFromState(id, workouts);

    const nextState = workout.getNextState(
      workout.state,
      {},
      { forceProgress: false, fromToday: false }
    );

    try {
      const response = await sendRequest(`/${workout.id}`, {
        body: { id: workout.id, state: nextState },
        method: "PATCH",
      });

      dispatch(
        programsActions.updateProgramsState([
          { id: response.id, active: true, state: response.nextState },
        ])
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal show={!!error} error={error} onClose={clearError} />

      <Card className={styles.calendar}>
        <Calendar
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
          scheduleService={scheduleService}
        />
      </Card>
      <Card className={styles.today}>
        <h1>Today:</h1>
        <ul>
          {today.map((s) => (
            <li key={s.name} className={styles.scheduled}>
              <h2>{s.name}</h2>
              <div className={styles["scheduled__desc"]}>{s.sessionDesc}</div>
              {compareAsc(
                workouts.byId[s.id].state.sessionDate,
                selectedDate
              ) === 0 && (
                <div className={styles["scheduled__ctrl"]}>
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
