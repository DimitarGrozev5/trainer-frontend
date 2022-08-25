import { compareAsc } from "date-fns";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { useScheduleService } from "../../../hooks/ScheduleService/useScheduleService";
import { roundDate } from "../../../util/date";
import Calendar from "../../Calendar/Calendar";
import Button from "../../UI-elements/Button/Button";
import Card from "../../UI-elements/Card/Card";
import styles from "./TrainingHub.module.css";

const TrainingHub = () => {
  const scheduleService = useScheduleService();

  // Get active workouts
  const activeWorkouts = useAppSelector((state) => state.programs.byId);

  // State for controlling the selected day
  const [selectedDate, setSelectedDate] = useState(roundDate(new Date()));

  // Get workouts for selected date
  const today = scheduleService(selectedDate);

  return (
    <>
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
            <li key={s.name}>
              <h2>{s.name}</h2>
              <p>{s.sessionDesc}</p>
              {compareAsc(
                activeWorkouts[s.id].state.sessionDate,
                selectedDate
              ) === 0 && (
                <>
                  <Button>Skip</Button>
                  <Button>Start</Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default TrainingHub;
