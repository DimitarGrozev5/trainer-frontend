import React, { useState } from "react";
import { lz } from "../../../../util/date";

import styles from "./DateInput.module.css";

interface Props {
  value: Date;
  onChange: (val: Date) => void;
}

const DateInput: React.FC<Props> = ({ value, onChange }) => {
  const [date, setDate] = useState(value.getDate());
  const [month, setMonth] = useState(value.getMonth());
  const [year, setYear] = useState(value.getFullYear());

  const changeHandler =
    (field: "date" | "month" | "year") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className={styles["date-input"]}>
      <input type="text" value={lz(date)} onChange={changeHandler("date")} />
      <input type="text" value={lz(month)} onChange={changeHandler("month")} />
      <input type="text" value={lz(year, 4)} onChange={changeHandler("year")} />
      <button>Cal</button>
    </div>
  );
};

export default DateInput;
