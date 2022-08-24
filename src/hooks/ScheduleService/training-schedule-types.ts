export class ScheduledSession {
  name: string;
  shortDesc: string;
  sessionDesc: any;

  constructor(name: string, shortDesc: string, sessionDesc: any) {
    this.name = name;
    this.shortDesc = shortDesc;
    this.sessionDesc = sessionDesc;
  }
}

export type DailySchedule = ScheduledSession[];

export type ScheduleService = (
  startDate: Date,
  endDate: Date
) => Map<Date, DailySchedule>;
