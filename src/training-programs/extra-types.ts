// Date object
export interface SessionDate {
  year: number;
  month: number;
  date: number;
}

export class SessionDate implements SessionDate {
  static from(date: Date): SessionDate {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    };
  }

  public year: number;
  public month: number;
  public date: number;

  constructor(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
  }
}
