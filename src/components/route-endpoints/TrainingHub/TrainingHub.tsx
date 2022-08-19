import { useState } from "react";
import Calendar from "../../Calendar/Calendar";
import Card from "../../UI-elements/Card/Card";
import styles from "./TrainingHub.module.css";

const TrainingHub = () => {
  // State for controlling the selected day
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <Card className={styles.calendar}>
        <Calendar selectedDate={selectedDate} onChangeDate={setSelectedDate} />
      </Card>
      <Card className={styles.today}>Today</Card>
    </>
  );
};

export default TrainingHub;
