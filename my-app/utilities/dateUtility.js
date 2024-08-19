function getPreviousSunday() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const daysUntilPreviousSunday = currentDay === 0 ? 7 : currentDay; // Calculate how many days to subtract to reach the previous Sunday

  const sundayDate = new Date(currentDate);
  sundayDate.setDate(currentDate.getDate() - daysUntilPreviousSunday);

  // Set the time to midnight (00:00:00) to get the start of Sunday
  sundayDate.setHours(0, 0, 0, 0);

  return sundayDate;
}

function parseWeekDay(activity) {
  const dayMap = {
    sun: 7,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  const [startTimeStr, endTimeStr] = activity[1].split('-');

  const startTimeParts = startTimeStr.split(':');
  const endTimeParts = endTimeStr.split(':');

  return [dayMap[activity[0]], startTimeParts, endTimeParts];
}

function weekDayToDate(activity) {
  const arr = parseWeekDay(activity);
  // get the start of the period
  let day = arr[0]; // Mon : 1, Tue: 2, Wed: 3 ...
  let startHours = parseInt(arr[1][0]);
  let startMinutes = parseInt(arr[1][1]);
  let endHours = parseInt(arr[2][0]);
  let endMinutes = parseInt(arr[2][1]);

  let dateStart = getPreviousSunday();
  dateStart.setDate(
    dateStart.getDate() + (day !== dateStart.getDay() ? (day + 7 - dateStart.getDay()) % 7 : 7)
  );
  dateStart.setHours(startHours, startMinutes, 0, 0);

  // get the end of the period
  let dateEnd = getPreviousSunday();
  dateEnd.setDate(
    dateEnd.getDate() + (day !== dateEnd.getDay() ? (day + 7 - dateEnd.getDay()) % 7 : 7)
  );
  dateEnd.setHours(endHours, endMinutes, 0, 0);

  return [dateStart, dateEnd];
}

export function createDates(lectures, subjectCode, color) {
  var events = [];
  lectures.forEach((activity, i) => {
    const [dateStart, dateEnd] = weekDayToDate(activity);
    events.push({
      id: i,
      title: 'Lecture: ' + subjectCode,
      start: dateStart,
      end: dateEnd,
      backgroundColor: color,
    });
  });
  return events;
}
