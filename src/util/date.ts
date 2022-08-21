// Get month name
export const getMonthName = (date: Date) => {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];
};

// Check if two dates are the same, ignoring hours, minutes, seconds and miliseconds
export const sameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Check if two dates are in the same month
export const sameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

// Generate an array of the days of a month, based on a Date from that month
type DateUTC = number;
export type DateOption = Date | -1;

const lastVal = (arr: Date[][]): number => {
  const last = arr.length;
  if (!last) {
    return -1;
  }

  const lastValLen = arr[last - 1].length;
  if (!lastValLen) {
    return -1;
  }

  return arr[last - 1][lastValLen - 1].getMonth();
};

export const getMonthArr = (
  date: Date,
  { getNumOfWeeks = 6, skipDaysFromOtherMonths = false } = {}
): Date[][] => {
  // Get current month
  const currentMonth = date.getMonth();

  // Get first day of month
  const firstDay: Date = new Date(date.getTime());
  firstDay.setMilliseconds(0);
  firstDay.setSeconds(0);
  firstDay.setMinutes(0);
  firstDay.setHours(0);
  firstDay.setDate(1);

  // Get day of week
  const firstDayOfWeek: number = firstDay.getDay();

  // Get date of monday
  const mondayDateUTC: DateUTC =
    firstDay.getTime() - firstDayOfWeek * 24 * 60 * 60 * 1000;

  // Generate array for month
  const month: Date[][] = [];
  while (month.length < getNumOfWeeks || lastVal(month) === currentMonth) {
    const weekArr: Date[] = [];
    for (let day = 0; day < 7; day++) {
      const today = new Date(
        mondayDateUTC +
          month.length * 7 * 24 * 60 * 60 * 1000 +
          day * 24 * 60 * 60 * 1000
      );
      weekArr.push(today);
    }
    month.push(weekArr);
  }

  return month;
};
