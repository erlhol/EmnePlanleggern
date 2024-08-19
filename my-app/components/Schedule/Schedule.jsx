import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import 'moment/locale/en-gb';
import { createDates } from '../../utilities/dateUtility';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export function Schedule(props) {
  const [allevents, setAllEvents] = useState([]);

  useEffect(() => {
    const updatedEvents = [];
    props?.selected?.forEach((courseObject, i) => {
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
  moment.locale('en-GB');
  const localizer = momentLocalizer(moment); // or globalizeLocalizer

  // myEventsList can be a state.
  // Each course can be a button, and when you click on it,
  // it will be displayed. With a color

  const minDate = new Date();
  minDate.setHours(7);

  const maxDate = new Date();
  maxDate.setHours(20);

  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: event.backgroundColor,
      },
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
  );

  return <MyCalendar />;
}

// TODO: create a smart schedule where we use AI
