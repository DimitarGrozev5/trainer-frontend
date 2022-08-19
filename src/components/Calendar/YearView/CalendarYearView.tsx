import { add } from "date-fns";
import React, { useMemo } from "react";
import { addToArr, getArr } from "../../../util/array";
import MonthViewSub from "./MonthViewSub/MonthViewSub";
import styles from "./YearView.module.css";

interface Props {
  targetDate: Date;
  setTargetDate: (d: Date) => void;
}

type DateUTC = number;

const CalendarYearView: React.FC<Props> = ({ targetDate, setTargetDate }) => {
  const year /* : number[][][] */ = useMemo(() => {
    // Build the calendar
    const year: number[][][] = [];
    const currentYear = targetDate.getFullYear();

    for (let month = 0; month < 12; month++) {
      const monthArr: number[][] = [];
      let currentDate = new Date(currentYear, month, 1);

      let week: number[] = [];
      if (currentDate.getDay() > 0) {
        week = getArr(currentDate.getDay(), -1);
      }
      monthArr.push(week);
      let currentWeek = 0;

      monthArr[currentWeek].push(currentDate.getTime());
      currentDate = add(currentDate, { days: 1 });

      while (currentDate.getDate() !== 1) {
        if (currentDate.getDay() === 0) {
          monthArr.push([]);
          currentWeek++;
        }

        monthArr[currentWeek].push(currentDate.getTime());
        currentDate = add(currentDate, { days: 1 });
      }

      if (currentDate.getDay() > 0) {
        monthArr[currentWeek] = addToArr(monthArr[currentWeek], 7, -1);
      }

      year.push(monthArr);
    }

    return year;
  }, [targetDate]);
  console.log(year);

  return (
    <div className={styles.calendar}>
      <div className={styles.row}>
        {year.slice(0, 3).map((month) => (
          <div key={new Date(month[0][6]).getMonth()}>
            <MonthViewSub month={month} setTargetDate={setTargetDate} />
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {year.slice(3, 6).map((month) => (
          <div key={new Date(month[0][6]).getMonth()}>
            <MonthViewSub month={month} setTargetDate={setTargetDate} />
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {year.slice(6, 9).map((month) => (
          <div key={new Date(month[0][6]).getMonth()}>
            <MonthViewSub month={month} setTargetDate={setTargetDate} />
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {year.slice(9, 12).map((month) => (
          <div key={new Date(month[0][6]).getMonth()}>
            <MonthViewSub month={month} setTargetDate={setTargetDate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarYearView;
