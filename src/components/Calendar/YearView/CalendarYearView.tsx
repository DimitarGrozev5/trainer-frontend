import React, { useMemo } from "react";
import { getMonthArr } from "../../../util/date";
import MonthViewSub from "./MonthViewSub/MonthViewSub";
import styles from "./YearView.module.css";

interface Props {
  targetDate: Date;
  setTargetDate: (d: Date) => void;
}

const CalendarYearView: React.FC<Props> = ({ targetDate, setTargetDate }) => {
  const year: Date[][][] = useMemo(() => {
    // Build the calendar
    const year: Date[][][] = [];
    const currentYear = targetDate.getUTCFullYear();

    for (let month = 0; month < 12; month++) {
      const monthArr: Date[][] = getMonthArr(new Date(currentYear, month, 1), {
        getNumOfWeeks: 0,
      });
      year.push(monthArr);
    }

    return year;
  }, [targetDate]);

  return (
    <div className={styles.calendar}>
      <div className={styles.row}>
        {year.slice(0, 3).map((month) => (
          <div key={month[0][6].getUTCMonth()}>
            <MonthViewSub month={month} setTargetDate={setTargetDate} />
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {year.slice(3, 6).map((month) => (
          <div key={new Date(month[0][6]).getUTCMonth()}>
            <MonthViewSub month={month} setTargetDate={setTargetDate} />
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {year.slice(6, 9).map((month) => (
          <div key={new Date(month[0][6]).getUTCMonth()}>
            <MonthViewSub month={month} setTargetDate={setTargetDate} />
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {year.slice(9, 12).map((month) => (
          <div key={new Date(month[0][6]).getUTCMonth()}>
            <MonthViewSub month={month} setTargetDate={setTargetDate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarYearView;
