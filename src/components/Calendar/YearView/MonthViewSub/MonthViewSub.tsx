import React from "react";

import styles from "./MonthViewSub.module.css";
import { getMonthName, sameDate, sameMonth } from "../../../../util/date";

interface Props {
  month: Date[][];
  setTargetDate: (d: Date) => void;
}

const MonthViewSub: React.FC<Props> = ({ month, setTargetDate }) => {
  const now = new Date();
  return (
    <>
      <h1 className={styles.name}>{getMonthName(month[0][6])}</h1>
      <table
        className={styles["small-cal"]}
        onClick={setTargetDate.bind(null, month[1][1])}
      >
        <thead>
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>T</th>
            <th>W</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {month.map((week, iW) => (
            <tr key={month[1][0].getUTCMonth() + iW * 10}>
              {week.map((day) => (
                <td
                  key={day.getTime() + iW * 10}
                  className={sameMonth(day, month[1][0]) && sameDate(new Date(day), now) ? styles.today : ""}
                >
                  {/* {day < 0 ? "" : new Date(day).getDate()} */}
                  {sameMonth(day, month[1][0]) ? day.getUTCDate() : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MonthViewSub;
