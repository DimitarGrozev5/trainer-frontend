import { ProgramId } from "../../training-programs/data-types";

export class ScheduledSession {
  id: ProgramId;
  name: string;
  shortDesc: string;
  sessionDesc: any;
  state: any;

  constructor(
    id: ProgramId,
    name: string,
    shortDesc: string,
    sessionDesc: any,
    state: any
  ) {
    this.id = id;
    this.name = name;
    this.shortDesc = shortDesc;
    this.sessionDesc = sessionDesc;
    this.state = state;
  }
}

export type DailySchedule = ScheduledSession[];

export type ScheduleService = (targetDate: Date) => DailySchedule;
