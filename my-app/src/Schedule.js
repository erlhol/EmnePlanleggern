import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useEffect, useState } from 'react';
import 'moment/locale/en-gb';
import { SelectedCourses } from './SelectedCourses';

function SmallSearch( {data} ) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    // Filter data based on the query and update searchResults
  };

  useEffect(() => {
    const filteredResults = data.filter(courseObject =>
      courseObject.subjectCode.toLowerCase().startsWith(searchTerm.toLowerCase())
    ).map(courseObject => [courseObject.subjectCode, courseObject.subjectName]).slice(0,5);
    setSearchResults(filteredResults);
    setShowDropdown(filteredResults.length > 0); 
  },[searchTerm])

  return (<div className="search-bar">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={handleInputChange}
  />
  {showDropdown && (
    <div className="dropdown">
      <ul>
        {searchResults.map((result, index) => (
          <li key={index} onClick={() => console.log(result)}>{result[0]} - {result[1]}</li>
        ))}
      </ul>
    </div>
  )}
</div>)
}

function createDates(lectures,subjectCode,color) {
    var events = []
    lectures.forEach((activity,i) => {
        const [dateStart,dateEnd] = weekDayToDate(activity)
        events.push({
            id: i,
            title: "Lecture: "+subjectCode,
            start: dateStart,
            end: dateEnd,
            backgroundColor: color
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
    props.selected.forEach((courseObject, i) => {
      const events = createDates(courseObject[0].lectures, courseObject[0].subjectCode,courseObject[1]);
      updatedEvents.push(...events); 
    });
    setAllEvents(updatedEvents);
  }, [props.selected]);

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

    const onSetSelectedSubjects = (subject,should_add) => {
      props.changeSelected(subject,false)
  }

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

    return <>
    <h1>Calendar of selected courses!</h1>
    <MyCalendar></MyCalendar>
    <SelectedCourses editSelected = {onSetSelectedSubjects} selected = {props.selected}></SelectedCourses>
    <SmallSearch data= {props.allSubjects}></SmallSearch>
    </>
}

export default Schedule;

// TODO: create a smart schedule where we use AI