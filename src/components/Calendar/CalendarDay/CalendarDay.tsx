import React from "react";
import { ScheduleService } from "../../../hooks/ScheduleService/training-schedule-types";

import styles from "./CalendarDay.module.css";

interface Props {
  date: Date;
  schedule: ScheduleService | undefined;
}

const CalendarDay: React.FC<Props> = ({ date, schedule }) => {
  const today = (schedule && schedule(date)) || [];
  // const today: DailySchedule = [];

  return (
    <div className={styles.day}>
      <header>{date.getDate()}</header>
      {today.map((t) => (
        <section key={t.name}>{t.name}</section>
      ))}
    </div>
  );
};

export default React.memo(CalendarDay);
