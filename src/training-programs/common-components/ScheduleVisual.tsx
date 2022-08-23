import React from "react";
import { getWeekDayShortName } from "../../util/date";

import styles from "./ScheduleVisual.module.css";

type Props = {
  weekly: string;
  frequency: number;
  pattern: number[];
};

const isWeekend = (i: number) => i % 7 > 4;

const isRegular = (fr: number) => (i: number) => i % fr === 0;
const isPattern = (pt: number[]) => (i: number) => pt.includes(i % 7);

const ScheduleVisual: React.FC<Props> = ({ weekly, frequency, pattern }) => {
  const isWorkout =
    weekly === "weekly" ? isPattern(pattern) : isRegular(frequency);

  const days: number[] = Array(14).fill(0);

  const dayDivs = days.map((e, i) => {
    return (
      <div key={i} className={isWeekend(i) ? styles.weekend : ""}>
        <span>{getWeekDayShortName(i)}</span>
        <span className={isWorkout(i) ? styles.workout : ""}>{i + 1}</span>
      </div>
    );
  });

  return <div className={styles.week}>{dayDivs}</div>;
};

export default ScheduleVisual;
