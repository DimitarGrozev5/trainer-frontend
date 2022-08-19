import React, { useMemo } from "react";
import { getMonthName } from "../../../util/date";
import styles from "./MonthView.module.css";

interface Props {
  targetDate: Date;
  setTargetDate: (d: Date) => void;
}

type DateUTC = number;

const WEEKS = 7 * 24 * 60 * 60 * 1000;
const DAYS = 24 * 60 * 60 * 1000;
const HOURS = 60 * 60 * 1000;
const MINUTES = 60 * 1000;
const SECONDS = 1000;

const CalendarMonthView: React.FC<Props> = ({ targetDate, setTargetDate }) => {
  // Get the days of the month
  const month: Date[][] = useMemo(() => {
    // Get first day of month
    const firstDay: Date = new Date(targetDate.getTime());
    firstDay.setMilliseconds(0);
    firstDay.setSeconds(0);
    firstDay.setMinutes(0);
    firstDay.setHours(0);
    firstDay.setDate(1);

    // Get day of week
    const firstDayOfWeek: number = firstDay.getDay();

    // Get date of monday
    const mondayDateUTC: DateUTC =
      firstDay.getTime() - (firstDayOfWeek - 1) * DAYS;

    // Generate array for month
    const month: Date[][] = [];
    for (let week = 0; week < 6; week++) {
      const weekArr: Date[] = [];
      for (let day = 0; day < 7; day++) {
        const today = new Date(mondayDateUTC + week * WEEKS + day * DAYS);
        weekArr.push(today);
      }
      month.push(weekArr);
    }

    return month;
  }, [targetDate]);

  const changeMonthHandler = (direction: 1 | -1) => () => {
    let prevMonthNum: number = targetDate.getMonth() + direction;
    if (prevMonthNum < 0) {
      prevMonthNum = 12;
    }
    if (prevMonthNum > 12) {
      prevMonthNum = 0;
    }

    const prevMonth: Date = new Date(targetDate.getTime());
    prevMonth.setMonth(prevMonthNum);

    setTargetDate(prevMonth);
  };

  return (
    <div className={styles["calendar-container"]}>
      <header className={styles.header}>
        <button
          onClick={changeMonthHandler(-1)}
          className={styles["header__nav"]}
        >
          {"<"}
        </button>
        <button className={styles["header__title"]}>
          {getMonthName(targetDate)} {targetDate.getFullYear()}
        </button>
        <button
          onClick={changeMonthHandler(1)}
          className={styles["header__nav"]}
        >
          {">"}
        </button>
        <button className={styles["header__today"]}>19</button>
      </header>
      <table className={styles["calendar"]}>
        <thead>
          <tr>
            <th>Mon</th>
            <th>Thu</th>
            <th>Thi</th>
            <th>Wed</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
          {month.map((week, i) => (
            <tr key={i.toString() + week[0].getTime()}>
              {week.map((day) => (
                <td key={day.getTime()}>{day.getDate()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarMonthView;
