import Card from "../../UI-elements/Card/Card";
import styles from "./TrainingHub.module.css";

const TrainingHub = () => {
  return (
    <>
      <Card className={styles.calendar}>Calendar</Card>
      <Card className={styles.today}>Today</Card>
    </>
  );
};

export default TrainingHub;
