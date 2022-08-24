import { add, compareAsc, differenceInDays } from "date-fns";
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
      const schedule = new Map<number, DailySchedule>();

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

      // End date must be no less than 6 months away
      if (differenceInDays(now, endDate) > 183) {
        endDate = add(now, { days: 183 });
      }

      //// Remove hours minutes and seconds from start and end dates
      sd = roundDate(sd);
      ed = roundDate(ed);

      //// Loop from start to end date and populate them
      activePrograms.forEach((program) => {
        let currentState = program.state;
        let currentDate: Date = currentState.sessionDate;

        while (compareAsc(currentDate, ed) <= 0) {
          if (compareAsc(currentDate, ed) < 0) {
            const session = new ScheduledSession(
              program.name,
              program.shortDesc,
              program.getDescFromState(currentState)
            );

            let arr: DailySchedule | undefined = [session];
            if (schedule.has(currentDate.getTime())) {
              const item = schedule.get(currentDate.getTime());
              arr = item && [...item, session];
            }
            arr && schedule.set(currentDate.getTime(), arr);
          }
          // console.log(currentDate);
          // console.log(ed);
          // console.log(compareAsc(currentDate, ed));

          currentState = program.getNextState(currentState, 0, true);
          currentDate = currentState.sessionDate;
        }
      });

      return schedule;
    },
    [activePrograms]
  );

  return scheduleService;
};
