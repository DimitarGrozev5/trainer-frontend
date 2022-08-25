import { useCallback, useEffect, useRef } from "react";
import { ProgramId } from "../../training-programs/data-types";
import { last } from "../../util/array";
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

  // Set caching of values
  const sessions = useRef<Map<ProgramId, Map<number, ScheduledSession>>>();

  useEffect(() => {
    sessions.current = new Map<ProgramId, Map<number, ScheduledSession>>();
    console.log("clear cache");
  }, [activePrograms]);

  const scheduleService = useCallback(
    (targetDate: Date) => {
      const target: number = targetDate.getTime();

      // I am using a flat map. If one of the workouts doens't return a value, the function
      // will return [], and flatMap will collapse it. In essence I am combining map + filter
      const schedule = activePrograms.flatMap((program) => {
        console.log("Get session");

        // Get cached schedule for current program
        let prSchedule = sessions.current?.get(program.id);
        if (!prSchedule) {
          prSchedule = new Map<number, ScheduledSession>();
          sessions.current?.set(program.id, prSchedule);
        }

        // Look in cached schedule for targetDate
        if (prSchedule.has(target)) {
          return prSchedule.get(target);
        }

        // If the last date in cached scedule is greather than the targetDate,
        // and the targetDate is not in the Map,
        // then the targetDate doesn't have a scheduled session
        const lastCachedDate = last(Array.from(prSchedule.keys()));
        if (target < lastCachedDate) {
          return [];
        }

        // If the target date is before the next scheduled session, return nothing
        if (target < program.state.sessionDate.getTime()) {
          return [];
        }

        // Generate sessions
        console.log("Generate Session");

        let [currentDate, currentState] = lastCachedDate
          ? last(Array.from(prSchedule.entries()))
          : [program.state.sessionDate.getTime(), program.state];

        prSchedule.set(
          currentDate,
          new ScheduledSession(
            program.name,
            program.shortDesc,
            program.getDescFromState(currentState),
            currentState
          )
        );

        while (currentDate < target) {
          currentState = program.getNextState(currentState, 0, true);
          currentDate = currentState.sessionDate.getTime();

          prSchedule.set(
            currentDate,
            new ScheduledSession(
              program.name,
              program.shortDesc,
              program.getDescFromState(currentState),
              currentState
            )
          );
        }

        // Look in cached schedule for targetDate
        if (prSchedule.has(target)) {
          return prSchedule.get(target);
        }

        return [];
      });

      return schedule ? (schedule as DailySchedule) : ([] as DailySchedule);
    },
    [sessions]
  );

  return scheduleService;
};
