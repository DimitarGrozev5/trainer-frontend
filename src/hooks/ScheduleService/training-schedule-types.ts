export interface ScheduledSession {
  name: string;
  shortDesc: string;
  params: any;
}

export type DailySchedule = ScheduledSession[];

export type ScheduleService = (
  startDate: Date,
  endDate: Date
) => Map<Date, DailySchedule>;
