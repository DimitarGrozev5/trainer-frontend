import React, { useMemo } from "react";
import styles from "./YearView.module.css";

interface Props {
  targetDate: Date;
  setTargetDate: (d: Date) => void;
}

type DateUTC = number;

const CalendarYearView: React.FC<Props> = ({ targetDate, setTargetDate }) => {
  const year /* : number[][][] */ = useMemo(() => {
    const y = targetDate.getFullYear();

    // Get first day of year
    const firstDay = new Date(y, 0, 1);

    // Get day of week
    const firstDayOfYear: number = firstDay.getDay();

    // Get date of monday
    const mondayDateUTC: DateUTC =
      firstDay.getTime() - (firstDayOfYear - 1) * 24 * 60 * 60 * 1000;

    // Build the calendar
    const year = [];
    for (let month = 0; month < 12; month++) {
      // const week = [];
      // const firstOfMonth: Date = new Date(y, month, 1);
      // const dayOfWeek: number = firstOfMonth.getDay();
      // const monday: DateUTC =
      //   firstOfMonth.getTime() - (firstDayOfYear - 1) * 24 * 60 * 60 * 1000;

      // let currentDay: Date = new Date(monday);

      // while (currentDay.getMonth() <= month) {
      //   for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      //     if()
      //   }
      // }
    }

    return year;
  }, [targetDate]);

  return <table className={styles.calendar}></table>;
};

export default CalendarYearView;
