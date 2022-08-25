import { add } from "date-fns";
import { useState } from "react";
import { useScheduleService } from "../../../hooks/ScheduleService/useScheduleService";
import { roundDate } from "../../../util/date";
import Calendar from "../../Calendar/Calendar";
import Card from "../../UI-elements/Card/Card";
import styles from "./TrainingHub.module.css";

const TrainingHub = () => {
  // State for controlling the selected day
  const [selectedDate, setSelectedDate] = useState(roundDate(new Date()));

  const scheduleService = useScheduleService();

  console.log(scheduleService(selectedDate));

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
      </Card>
    </>
  );
};

export default TrainingHub;
