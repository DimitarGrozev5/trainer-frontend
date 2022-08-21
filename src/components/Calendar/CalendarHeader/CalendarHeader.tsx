import React from "react";
import styles from "./CalendarHeader.module.css";

interface Props {
  title: string;
  resetValue: string;
  onChnagePeriod: (d: 1 | -1) => () => void;
  onPeriodToToday: () => void;
  onChangeViewMode: () => void;
}

const CalendarHeader: React.FC<Props> = ({
  title,
  resetValue,
  onChnagePeriod,
  onPeriodToToday,
  onChangeViewMode,
}) => {
  return (
    <header className={styles.header}>
      <button onClick={onChnagePeriod(-1)} className={styles["header__nav"]}>
        {"<"}
      </button>
      <button className={styles["header__title"]} onClick={onChangeViewMode}>
        {title}
      </button>
      <button onClick={onChnagePeriod(1)} className={styles["header__nav"]}>
        {">"}
      </button>
      <button onClick={onPeriodToToday} className={styles["header__today"]}>
        {resetValue}
      </button>
    </header>
  );
};

export default CalendarHeader;
