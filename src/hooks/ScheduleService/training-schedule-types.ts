export class ScheduledSession {
  name: string;
  shortDesc: string;
  sessionDesc: any;
  state: any;

  constructor(name: string, shortDesc: string, sessionDesc: any, state: any) {
    this.name = name;
    this.shortDesc = shortDesc;
    this.sessionDesc = sessionDesc;
    this.state = state;
  }
}

export type DailySchedule = ScheduledSession[];

export type ScheduleService = (targetDate: Date) => DailySchedule;
