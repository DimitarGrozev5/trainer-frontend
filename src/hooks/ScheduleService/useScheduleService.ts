import { compareAsc } from "date-fns";
import { useCallback } from "react";
import { roundDate } from "../../util/date";
import { populateProgramsArr, useAppSelector } from "../redux-hooks";
import {
  DailySchedule,
  ScheduleService,
  ScheduledSession,
} from "./training-schedule-types";

export const useScheduleService = (): ScheduleService => {
  // Get all active programs
  const activePrograms = useAppSelector(populateProgramsArr()).filter(
    (p) => p.active
  );

  const scheduleService = useCallback(
    (startDate: Date, endDate: Date) => {
      const schedule = new Map<Date, DailySchedule>();

      const now = new Date();

      //// Adjust start and end dates
      let sd = startDate;
      let ed = endDate;

      // Start date must be before end date
      if (compareAsc(startDate, endDate) >= 0) {
        return schedule;
      }

      // Start date must be after end date
      if (compareAsc(startDate, now) > 0) {
        sd = now;
      }

      // End date must be after today
      if (compareAsc(now, endDate) > 0) {
        ed = now;
      }

      //// Remove hours minutes and seconds from start and end dates
      sd = roundDate(sd);
      ed = roundDate(ed);

      //// Loop from start to end date and populate them

      return schedule;
    },
    [activePrograms]
  );

  return scheduleService;
};
