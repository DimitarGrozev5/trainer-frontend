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

  // Calendar current month
  // const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  // const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  switch (viewMode) {
    case "month":
      return (
        <CalendarMonthView
          targetDate={selectedDate}
        />
      );

    default:
      return <></>;
  }
};

export default Calendar;
