import { useCallback, useContext } from "react";
import { last } from "../../util/array";
import { populateProgramsState, useAppSelector } from "../redux-hooks";
import {
  DailySchedule,
  ScheduleService,
  ScheduledSession,
} from "./training-schedule-types";
import { ScheduleCacheContext } from "../ScheduleService/schedule-cache-context";

export const useScheduleService = (): ScheduleService => {
  // Get all active programs
  const programsState = useAppSelector((state) => state.programs);

  // Set caching of values
  const sessionsCache = useContext(ScheduleCacheContext);

  const scheduleService = useCallback(
    (targetDate: Date) => {
      const activePrograms = populateProgramsState(programsState).filter(
        (p) => p.active
      );

      const target: number = targetDate.getTime();

      // I am using a flat map. If one of the workouts doens't return a value, the function
      // will return [], and flatMap will collapse it. In essence I am combining map + filter
      const schedule = activePrograms.flatMap((program) => {
        // console.log("Get session");

        // Get cached schedule for current program
        let prSchedule = sessionsCache.get(program.id);
        if (!prSchedule) {
          prSchedule = new Map<number, ScheduledSession>();
          sessionsCache.set(program.id, prSchedule);
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
        if (target < program.state.sessionDate) {
          return [];
        }

        // Generate sessions
        // console.log("Generate Session");

        let [currentDate, currentState] = lastCachedDate
          ? last(Array.from(prSchedule.entries()))
          : [program.state.sessionDate, program.state];

        prSchedule.set(
          currentDate,
          new ScheduledSession(
            program.id,
            program.name,
            program.shortDesc,
            program.getDescFromState(currentState),
            currentState
          )
        );

        while (currentDate < target) {
          currentState = program.getNextState(currentState, 0, {
            forceProgress: true,
            fromToday: false,
          });
          currentDate = currentState.sessionDate;

          prSchedule.set(
            currentDate,
            new ScheduledSession(
              program.id,
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
    [sessionsCache, programsState]
  );

  return scheduleService;
};
