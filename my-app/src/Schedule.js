import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useEffect, useState } from 'react';
import chroma from 'chroma-js';
import 'moment/locale/en-gb';

function generateRandomColor() {
  let color;
  do {
    // Generate a random color
    color = chroma.random();
  } while (!chroma.contrast(color, 'white') >= 4.5); // Ensure sufficient contrast with white (you can change this value as needed)

  return color.hex();
}

function createDates(lectures,subjectCode) {
    const unique = generateRandomColor();
    var events = []
    lectures.forEach((activity,i) => {
        const [dateStart,dateEnd] = weekDayToDate(activity)
        events.push({
            id: i,
            title: "Lecture: "+subjectCode,
            start: dateStart,
            end: dateEnd,
            backgroundColor: unique
        })
    });
    return events
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

    return [dayMap[activity[0]],startTimeParts,endTimeParts]
}

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

function weekDayToDate(activity) {
    const arr = parseWeekDay(activity)
    // get the start of the period
    let day = arr[0]; // Mon : 1, Tue: 2, Wed: 3 ...
    let startHours = parseInt(arr[1][0]);
    let startMinutes = parseInt(arr[1][1]);
    let endHours = parseInt(arr[2][0]);
    let endMinutes = parseInt(arr[2][1]);

    let dateStart = getPreviousSunday();
    dateStart.setDate(dateStart.getDate() + (day !== dateStart.getDay() ? (day + 7 - dateStart.getDay()) % 7 : 7));
    dateStart.setHours(startHours, startMinutes, 0, 0)

    // get the end of the period
    let dateEnd = getPreviousSunday();
    dateEnd.setDate(dateEnd.getDate() + (day !== dateEnd.getDay() ? (day + 7 - dateEnd.getDay()) % 7 : 7));
    dateEnd.setHours(endHours, endMinutes, 0, 0)

    return [dateStart,dateEnd]
}

function Schedule(props) {
  const [allevents, setAllEvents] = useState([]);

  useEffect(() => {
    const updatedEvents = [];
    props.subjects.forEach((courseObject, i) => {
      const events = createDates(courseObject.lectures, courseObject.subjectCode);
      updatedEvents.push(...events); 
    });
    setAllEvents(updatedEvents);
  }, [props.subjects]);

    // Setup the localizer by providing the moment (or globalize, or Luxon) Object
    // to the correct localizer.
    moment.locale('en-GB');
    const localizer = momentLocalizer(moment) // or globalizeLocalizer

    // myEventsList can be a state.
    // Each course can be a button, and when you click on it, 
    // it will be displayed. With a color

    const minDate = new Date();
    minDate.setHours(7);

    const maxDate = new Date();
    maxDate.setHours(20);

    const eventPropGetter = (event) => {
      // Customize event properties based on your logic
      return {
        style: {
          backgroundColor: event.backgroundColor, // You can set other styles as well
        }
      };
    };

      const MyCalendar = () => (
        <div className="myCustomHeight">
          <Calendar
            min={minDate}
            max={maxDate}
            localizer={localizer}
            events={allevents}
            startAccessor="start"
            endAccessor="end"
            defaultView={'work_week'}
            views={['work_week']}
            eventPropGetter={eventPropGetter}
          />
        </div>
      )

    return <MyCalendar></MyCalendar>
}

export default Schedule;

// TODO: create a smart schedule where we use AI