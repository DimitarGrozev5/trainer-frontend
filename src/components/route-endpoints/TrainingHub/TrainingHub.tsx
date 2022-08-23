import { useState } from "react";
import { useScheduleService } from "../../../hooks/ScheduleService/useScheduleService";
import Calendar from "../../Calendar/Calendar";
import Card from "../../UI-elements/Card/Card";
import styles from "./TrainingHub.module.css";

const TrainingHub = () => {
  // State for controlling the selected day
  const [selectedDate, setSelectedDate] = useState(new Date());

  const scheduleService = useScheduleService();

  return (
    <>
      <Card className={styles.calendar}>
        <Calendar
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
          scheduleService={scheduleService}
        />
      </Card>
      <Card className={styles.today}>Today</Card>
    </>
  );
};

export default TrainingHub;
