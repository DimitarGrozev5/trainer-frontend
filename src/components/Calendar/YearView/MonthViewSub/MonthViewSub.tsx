import React from "react";

import styles from "./MonthViewSub.module.css";
import { getMonthName } from "../../../../util/date";

interface Props {
  month: number[][];
}

const MonthViewSub: React.FC<Props> = ({ month }) => {
  return (
    <>
      <h1 className={styles.name}>{getMonthName(new Date(month[0][6]))}</h1>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Thu</th>
            <th>Thi</th>
            <th>Wed</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {month.map((week) => (
            <tr>
              {week.map((day) => (
                <td>{day < 0 ? "" : new Date(day).getDate()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MonthViewSub;
