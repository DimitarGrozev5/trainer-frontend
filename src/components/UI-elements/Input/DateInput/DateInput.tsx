import React from "react";
import { lz } from "../../../../util/date";

import styles from "./DateInput.module.css";

interface Props {
  value: Date;
  onChange: (val: Date) => void;
}

const DateInput: React.FC<Props> = ({ value, onChange }) => {
  // const [date, setDate] = useState(value.getDate());
  // const [month, setMonth] = useState(value.getUTCMonth());
  // const [year, setYear] = useState(value.getUTCFullYear());

  const date = `${lz(value.getUTCFullYear(), 4)}-${lz(value.getUTCMonth() + 1)}-${lz(
    value.getUTCDate()
  )}`;

  // const changeHandler =
  //   (field: "date" | "month" | "year") =>
  //   (e: React.ChangeEvent<HTMLInputElement>) => {};

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d: number[] = e.currentTarget.value.split("-").map((a) => +a);
    onChange(new Date(d[0], d[1] - 1, d[2]));
  };

  return (
    <input
      type="date"
      value={date}
      onChange={changeHandler}
      className={styles["date-input"]}
    />
  );

  // return (
  //   <div className={styles["date-input"]}>
  //     <input
  //       type="text"
  //       maxLength={2}
  //       value={lz(date)}
  //       onChange={changeHandler("date")}
  //     />
  //     /
  //     <input
  //       type="text"
  //       maxLength={2}
  //       value={lz(month)}
  //       onChange={changeHandler("month")}
  //     />
  //     /
  //     <input
  //       className={styles["date-input__year"]}
  //       type="text"
  //       maxLength={4}
  //       value={lz(year, 4)}
  //       onChange={changeHandler("year")}
  //     />
  //     <button type="button" className={styles["date-input__button"]}>
  //       Cal
  //     </button>
  //   </div>
  // );
};

export default DateInput;
