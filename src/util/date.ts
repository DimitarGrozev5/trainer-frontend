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
export const getMonthArr = (
  date: Date,
  { numberOfWeeks = 6, skipDaysFromOtherMonths = false } = {}
): Date[][] => {
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
  type DateUTC = number;
  const month: Date[][] = [];
  for (let week = 0; week < numberOfWeeks; week++) {
    const weekArr: Date[] = [];
    for (let day = 0; day < 7; day++) {
      const today = new Date(
        mondayDateUTC +
          week * 7 * 24 * 60 * 60 * 1000 +
          day * 24 * 60 * 60 * 1000
      );
      weekArr.push(today);
    }
    month.push(weekArr);
  }

  return month;
};
