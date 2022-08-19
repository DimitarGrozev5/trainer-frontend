import React from "react";

import styles from "./MonthViewSub.module.css";
import { getMonthName, sameDate } from "../../../../util/date";

interface Props {
  month: number[][];
  setTargetDate: (d: Date) => void;
}

const MonthViewSub: React.FC<Props> = ({ month, setTargetDate }) => {
  const now = new Date();
  return (
    <>
      <h1 className={styles.name}>{getMonthName(new Date(month[0][6]))}</h1>
      <table
        className={styles["small-cal"]}
        onClick={setTargetDate.bind(null, new Date(month[1][1]))}
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
          {month.map((week) => (
            <tr key={week.find((d) => d > 0)}>
              {week.map((day, i) => (
                <td
                  key={i.toString() + day}
                  className={sameDate(new Date(day), now) ? styles.today : ""}
                >
                  {day < 0 ? "" : new Date(day).getDate()}
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
