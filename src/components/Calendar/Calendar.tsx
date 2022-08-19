import React, { useState } from "react";
import styles from "./Calendar.module.css";
import CalendarMonthView from "./MonthView/CalendarMonthView";

interface Props {
  selectedDate: Date;
  onChangeDate: (num: Date) => void;
  // scheduleService: ScheduleService;
}

type CalendarView = "month" | "year" | "dacade";

const Calendar: React.FC<Props> = ({ selectedDate, onChangeDate }) => {
  // Calendar view mode
  const [viewMode, setViewMode] = useState<CalendarView>("month");

  const [targetDate, setTargetDate] = useState(new Date());

  let calendar = <></>;
  switch (viewMode) {
    case "month":
      calendar = (
        <CalendarMonthView
          targetDate={targetDate}
          setTargetDate={setTargetDate}
          selectedDate={selectedDate}
          setSelectedDate={onChangeDate}
          onChangeViewMode={setViewMode.bind(null, "year")}
        />
      );
      break;

    default:
      calendar = <></>;
  }

  return <div className={styles["calendar-container"]}>{calendar}</div>;
};

export default Calendar;
