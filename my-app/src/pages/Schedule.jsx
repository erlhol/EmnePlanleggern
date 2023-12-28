import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import "moment/locale/en-gb";
import { SelectedCourses } from "../components/common/SelectedCourses";
import { createDates } from "../utilities/dateUtility";

function SmallSearch({ data }) {
  /* TODO: fix the search functionality
  When pressed button, the course should be removed from the courses list (in dropdown)
  And then dropdown should not display */

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = e => {
    const query = e.target.value;
    setSearchTerm(query);
    // Filter data based on the query and update searchResults
  };

  useEffect(() => {
    const filteredResults = data
      .filter(courseObject =>
        courseObject.subjectCode
          .toLowerCase()
          .startsWith(searchTerm.toLowerCase())
      )
      .map(courseObject => [courseObject.subjectCode, courseObject.subjectName])
      .slice(0, 5);
    setSearchResults(filteredResults);
    setShowDropdown(filteredResults.length > 0);
  }, [searchTerm]);

  return (
    <div className="search-bar">
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
              <li key={index} onClick={() => console.log(result)}>
                {result[0]} - {result[1]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Schedule(props) {
  const [allevents, setAllEvents] = useState([]);

  useEffect(() => {
    const updatedEvents = [];
    props.selected.forEach((courseObject, i) => {
      const events = createDates(
        courseObject[0].lectures,
        courseObject[0].subjectCode,
        courseObject[1]
      );
      updatedEvents.push(...events);
    });
    setAllEvents(updatedEvents);
  }, [props.selected]);

  // Setup the localizer by providing the moment (or globalize, or Luxon) Object
  // to the correct localizer.
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment); // or globalizeLocalizer

  // myEventsList can be a state.
  // Each course can be a button, and when you click on it,
  // it will be displayed. With a color

  const minDate = new Date();
  minDate.setHours(7);

  const maxDate = new Date();
  maxDate.setHours(20);

  const eventPropGetter = event => {
    return {
      style: {
        backgroundColor: event.backgroundColor,
      },
    };
  };

  const onSetSelectedSubjects = (subject, should_add) => {
    props.changeSelected(subject, false);
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
        defaultView={"work_week"}
        views={["work_week"]}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );

  return (
    <>
      <h1>Calendar</h1>
      <MyCalendar></MyCalendar>
      <SelectedCourses
        editSelected={onSetSelectedSubjects}
        selected={props.selected}
      ></SelectedCourses>
      <SmallSearch data={props.allSubjects}></SmallSearch>
    </>
  );
}

export default Schedule;

// TODO: create a smart schedule where we use AI
