import React, { useEffect, useMemo, useState } from "react";
import {
  DailySchedule,
  ScheduleService,
} from "../../../hooks/ScheduleService/training-schedule-types";
import { getMonthArr, sameDate, sameMonth } from "../../../util/date";
import CalendarDay from "../CalendarDay/CalendarDay";
import styles from "./MonthView.module.css";

interface Props {
  targetDate: Date;
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  scheduleService?: ScheduleService;
}

// Function to set the style of a Calendar day
const setStyles = (
  current: Date,
  target: Date,
  today: Date,
  selected: Date
): string => {
  const classes: string[] = [];
  if (!sameMonth(current, target)) {
    classes.push(styles["other-month"]);
  }
  sameDate(current, today) && classes.push(styles.today);
  sameDate(current, selected) && classes.push(styles.selected);

  return classes.join(" ");
};

const CalendarMonthView: React.FC<Props> = ({
  targetDate,
  selectedDate,
  setSelectedDate,
  scheduleService,
}) => {
  // Get the days of the month
  const month: Date[][] = useMemo(() => getMonthArr(targetDate), [targetDate]);

  // Get tarining schedule from service
  const [schedule, setSchedule] = useState<null | Map<number, DailySchedule>>(
    null
  );
  useEffect(() => {
    if (scheduleService) {
      const sc = scheduleService(month[0][0], month[5][6]);
      setSchedule(sc);
    }
  }, [scheduleService, month]);

  return (
    <table className={styles["calendar"]}>
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
        {month.map((week, i) => (
          <tr key={i.toString() + week[0].getTime()}>
            {week.map((day) => (
              <td
                key={day.getTime()}
                className={setStyles(day, targetDate, new Date(), selectedDate)}
                onClick={setSelectedDate.bind(null, day)}
              >
                <CalendarDay date={day} schedule={schedule} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarMonthView;
