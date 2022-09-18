import { last } from './array';

// Get month name
export const getMonthName = (date: Date) => {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][date.getUTCMonth()];
};

export const getWeekDayShortName = (day: number) =>
  ['Mon', 'Thu', 'Thi', 'Wed', 'Fri', 'Sat', 'Sun'][day % 7];

// Function to add leading zeroes
export const lz = (num: number, length: number = 2): string => {
  return (100000 + num).toString().substring(6 - length);
};

// Remove hours minutes and seconds from Date
export const roundDate = (
  date: Date,
  to: 'miliseconds' | 'seconds' | 'minutes' | 'hours' = 'hours'
): Date => {
  const d = new Date(date);

  switch (to) {
    // @ts-ignore
    case 'hours': // eslint-disable-line
      d.setUTCHours(0);

    // @ts-ignore
    case 'minutes': // eslint-disable-line
      d.setUTCMinutes(0);

    // @ts-ignore
    case 'seconds': // eslint-disable-line
      d.setUTCSeconds(0);

    // @ts-ignore
    case 'miliseconds': // eslint-disable-line
      d.setUTCMilliseconds(0);

    default: // eslint-disable-line
      break;
  }

  return d;
};

// Get today, rounded to hours
export const now = () => roundDate(new Date());

// Check if two dates are the same, ignoring hours, minutes, seconds and miliseconds
export const sameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Check if two dates are in the same month
export const sameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth()
  );
};

// Generate an array of the days of a month, based on a Date from that month
type DateUTC = number;

export const getMonthArr = (
  date: Date,
  { getNumOfWeeks = 6 } = {}
): Date[][] => {
  // Get current month
  const currentMonth = date.getUTCMonth();

  // Get first day of month
  const firstDay: Date = new Date(date);
  firstDay.setUTCMilliseconds(0);
  firstDay.setUTCSeconds(0);
  firstDay.setUTCMinutes(0);
  firstDay.setUTCHours(0);
  firstDay.setUTCDate(1);

  // Get day of week
  const firstDayOfWeek: number = firstDay.getUTCDay();

  // Get date of monday
  const mondayDateUTC: DateUTC =
    firstDay.getTime() - firstDayOfWeek * 24 * 60 * 60 * 1000;

  // Generate array for month
  const month: Date[][] = [];
  let lastDayOfWeek = firstDay;

  // Loop through weeks until reaching the desired number of weeks or until the date goes to another month
  while (
    month.length < getNumOfWeeks ||
    lastDayOfWeek.getUTCMonth() === currentMonth
  ) {
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
    lastDayOfWeek = last(weekArr);
  }

  return month;
};
