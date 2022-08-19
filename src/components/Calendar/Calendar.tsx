import { add } from "date-fns";
import React, { useState } from "react";
import { getMonthName } from "../../util/date";
import styles from "./Calendar.module.css";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarMonthView from "./MonthView/CalendarMonthView";
import CalendarYearView from "./YearView/CalendarYearView";

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

  const changePeriod = (ammount: string) => (direction: 1 | -1) => () => {
    const a = ammount === "decade" ? "years" : ammount;
    const d = ammount === "decade" ? direction * 10 : direction;

    const newDate: Date = add(targetDate, { [a]: d });
    setTargetDate(newDate);
  };
  const setPeriodToToday = () => {
    setTargetDate(new Date());
  };

  let title = "";
  let changePeriodHandler = changePeriod("");
  let calendar = <></>;
  switch (viewMode) {
    case "month":
      title = `${getMonthName(targetDate)} ${targetDate.getFullYear()}`;
      changePeriodHandler = changePeriod("months");
      calendar = (
        <CalendarMonthView
          targetDate={targetDate}
          selectedDate={selectedDate}
          setSelectedDate={onChangeDate}
        />
      );
      break;

    case "year":
      title = targetDate.getFullYear().toString();
      changePeriodHandler = changePeriod("years");
      calendar = (
        <CalendarYearView
          targetDate={targetDate}
          setTargetDate={(target: Date) => {
            setViewMode("month");
            setTargetDate(target);
          }}
        />
      );
      break;

    default:
      break;
  }

  return (
    <div className={styles["calendar-container"]}>
      <CalendarHeader
        title={title}
        onChnagePeriod={changePeriodHandler}
        onPeriodToToday={setPeriodToToday}
        onChangeViewMode={setViewMode.bind(null, "year")}
      />
      {calendar}
    </div>
  );
};

export default Calendar;
