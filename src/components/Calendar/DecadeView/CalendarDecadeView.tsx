import React from "react";

import styles from "./DecadeView.module.css";

interface Props {
  targetDate: Date;
  setTargetDate: (d: Date) => void;
}

const CalendarDecadeView: React.FC<Props> = ({ targetDate, setTargetDate }) => {
  const year = targetDate.getFullYear();

  const setTargetDateHandler = (y: number) => () => {
    setTargetDate(new Date(y, 0, 1));
  };
  return (
    <div className={styles.container}>
      <div className={styles["row"]}>
        <div className={styles.year} onClick={setTargetDateHandler(year - 5)}>
          {year - 5}
        </div>
        <div className={styles.year} onClick={setTargetDateHandler(year - 4)}>
          {year - 4}
        </div>
        <div className={styles.year} onClick={setTargetDateHandler(year - 3)}>
          {year - 3}
        </div>
        <div className={styles.year} onClick={setTargetDateHandler(year - 2)}>
          {year - 2}
        </div>
        <div className={styles.year} onClick={setTargetDateHandler(year - 1)}>
          {year - 1}
        </div>
      </div>
      <div className={styles["row"]}>
        <div className={styles.year} onClick={setTargetDateHandler(year)}>
          {year}
        </div>
      </div>
      <div className={styles["row"]}>
        <div className={styles.year} onClick={setTargetDateHandler(year + 1)}>
          {year + 1}
        </div>
        <div className={styles.year} onClick={setTargetDateHandler(year + 2)}>
          {year + 2}
        </div>
        <div className={styles.year} onClick={setTargetDateHandler(year + 3)}>
          {year + 3}
        </div>
        <div className={styles.year} onClick={setTargetDateHandler(year + 4)}>
          {year + 4}
        </div>
        <div className={styles.year} onClick={setTargetDateHandler(year + 5)}>
          {year + 5}
        </div>
      </div>
    </div>
  );
};

export default CalendarDecadeView;
