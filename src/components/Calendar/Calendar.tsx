import { add } from "date-fns";
import React, { useState } from "react";
import { ScheduleService } from "../../hooks/ScheduleService/training-schedule-types";
import { getMonthName } from "../../util/date";
import styles from "./Calendar.module.css";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDecadeView from "./DecadeView/CalendarDecadeView";
import CalendarMonthView from "./MonthView/CalendarMonthView";
import CalendarYearView from "./YearView/CalendarYearView";

interface Props {
  selectedDate: Date;
  onChangeDate: (num: Date) => void;
  scheduleService?: ScheduleService;
}

type CalendarView = "month" | "year" | "dacade";

const Calendar: React.FC<Props> = ({
  selectedDate,
  onChangeDate,
  scheduleService,
}) => {
  // Calendar view mode
  const [viewMode, setViewMode] = useState<CalendarView>("month");

  const [targetDate, setTargetDate] = useState(new Date());

  const changePeriod = (ammount: string) => (direction: 1 | -1) => () => {
    const a = ammount === "dacade" ? "years" : ammount;
    const d = ammount === "dacade" ? direction * 10 : direction;

    const newDate: Date = add(targetDate, { [a]: d });
    setTargetDate(newDate);
  };
  const setPeriodToToday = () => {
    setTargetDate(new Date());
  };

  let title = "";
  let headerTarget: CalendarView = "month";
  let resetValue: string = new Date().getDate().toString();
  let changePeriodHandler = changePeriod("");
  let calendar = <></>;
  switch (viewMode) {
    case "month":
      title = `${getMonthName(targetDate)} ${targetDate.getFullYear()}`;
      headerTarget = "year";
      changePeriodHandler = changePeriod("months");
      calendar = (
        <CalendarMonthView
          targetDate={targetDate}
          selectedDate={selectedDate}
          setSelectedDate={onChangeDate}
          scheduleService={scheduleService}
        />
      );
      break;

    case "year":
      title = targetDate.getFullYear().toString();
      headerTarget = "dacade";
      resetValue = new Date().getFullYear().toString().substring(2);
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

    case "dacade":
      title = `${targetDate.getFullYear() - 5} - ${
        targetDate.getFullYear() + 5
      }`;
      headerTarget = "dacade";
      resetValue = new Date().getFullYear().toString().substring(2);
      changePeriodHandler = changePeriod("dacade");
      calendar = (
        <CalendarDecadeView
          targetDate={targetDate}
          setTargetDate={(target: Date) => {
            setViewMode("year");
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
        resetValue={resetValue}
        onChnagePeriod={changePeriodHandler}
        onPeriodToToday={setPeriodToToday}
        onChangeViewMode={setViewMode.bind(null, headerTarget)}
      />
      {calendar}
    </div>
  );
};

export default Calendar;
