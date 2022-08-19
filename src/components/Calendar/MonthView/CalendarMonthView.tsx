import { add } from "date-fns";
import React, { useMemo } from "react";
import { getMonthName, sameDate, sameMonth } from "../../../util/date";
import styles from "./MonthView.module.css";

interface Props {
  targetDate: Date;
  setTargetDate: (d: Date) => void;
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  onChangeViewMode: () => void;
}

type DateUTC = number;

const WEEKS = 7 * 24 * 60 * 60 * 1000;
const DAYS = 24 * 60 * 60 * 1000;
const HOURS = 60 * 60 * 1000;
const MINUTES = 60 * 1000;
const SECONDS = 1000;

// Function to set the style of a Calendar day
const setStyles = (
  current: Date,
  target: Date,
  today: Date,
  selected: Date
): string => {
  const classes: string[] = [];
  if (!sameMonth(current, target)) {
    classes.push(styles["other-month"]);
  }
  sameDate(current, today) && classes.push(styles.today);
  sameDate(current, selected) && classes.push(styles.selected);

  return classes.join(" ");
};

const CalendarMonthView: React.FC<Props> = ({
  targetDate,
  setTargetDate,
  selectedDate,
  setSelectedDate,
  onChangeViewMode,
}) => {
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
    const prevMonth: Date = add(targetDate, { months: direction });
    setTargetDate(prevMonth);
  };

  const setMonthToToday = () => {
    setTargetDate(new Date());
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
        <button className={styles["header__title"]} onClick={onChangeViewMode}>
          {getMonthName(targetDate)} {targetDate.getFullYear()}
        </button>
        <button
          onClick={changeMonthHandler(1)}
          className={styles["header__nav"]}
        >
          {">"}
        </button>
        <button onClick={setMonthToToday} className={styles["header__today"]}>
          {new Date().getDate()}
        </button>
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
                <td
                  key={day.getTime()}
                  className={setStyles(
                    day,
                    targetDate,
                    new Date(),
                    selectedDate
                  )}
                  onClick={setSelectedDate.bind(null, day)}
                >
                  {day.getDate()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarMonthView;
