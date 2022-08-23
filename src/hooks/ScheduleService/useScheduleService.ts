import { useMemo } from "react";
import { ScheduleService } from "./training-schedule-types";

export const useScheduleService = (): ScheduleService => {
  const scheduleService = useMemo(() => ({} as ScheduleService), []);

  return scheduleService;
};
