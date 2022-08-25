import React from "react";
import { getWeekDayShortName } from "../../util/date";

import styles from "./ScheduleVisual.module.css";

type Props = {
  pattern: number[];
};

const isWeekend = (i: number) => i % 7 > 4;

const ScheduleVisual: React.FC<Props> = ({ pattern }) => {
  // const isWorkout =
  //   weekly === "weekly" ? isPattern(pattern) : isRegular(frequency);

  const w1: boolean[] = pattern.flatMap((c) => [
    true,
    ...Array(c - 1).fill(false),
  ]);

  let days: boolean[] = [];
  while (days.length < 14) {
    days = [...days, ...w1];
  }

  const dayDivs = days.slice(0, 14).map((w, i) => {
    return (
      <div key={i} className={isWeekend(i) ? styles.weekend : ""}>
        <span>{getWeekDayShortName(i)}</span>
        <span className={w ? styles.workout : ""}>{i + 1}</span>
      </div>
    );
  });

  return <div className={styles.week}>{dayDivs}</div>;
};

export default ScheduleVisual;
