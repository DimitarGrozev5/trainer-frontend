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
      <table className={styles["small-cal"]}>
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
