import React from "react";
import { DailySchedule } from "../../../hooks/ScheduleService/training-schedule-types";

import styles from "./CalendarDay.module.css";

interface Props {
  date: Date;
  schedule: Map<number, DailySchedule> | null;
}

const CalendarDay: React.FC<Props> = ({ date, schedule }) => {
  const today = (schedule && schedule.get(date.getTime())) || [];
  return (
    <div className={styles.day}>
      <header>{date.getDate()}</header>
      {today.map((t) => (
        <section key={t.name}>{t.name}</section>
      ))}
    </div>
  );
};

export default CalendarDay;
