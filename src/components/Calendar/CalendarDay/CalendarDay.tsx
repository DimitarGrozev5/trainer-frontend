import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { ScheduleService } from "../../../hooks/ScheduleService/training-schedule-types";

import styles from "./CalendarDay.module.css";

interface Props {
  date: Date;
}

const CalendarDay: React.FC<Props> = ({ date }) => {
  // const today = (schedule && schedule(date)) || [];
  // TODO: Move this selector in a separate function
  const today = useAppSelector((state) =>
    Object.entries(state.scheduleCache).flatMap(([, schedule]) => {
      if (date.getTime() in schedule && schedule[date.getTime()]) {
        const sc = schedule[date.getTime()];
        return sc ? sc : [];
      }
      return [];
    })
  );

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
