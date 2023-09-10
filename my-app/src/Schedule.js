import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

function Schedule() {
    // Setup the localizer by providing the moment (or globalize, or Luxon) Object
    // to the correct localizer.
    const localizer = momentLocalizer(moment) // or globalizeLocalizer

    // myEventsList can be a 
    const myEventsList = [
        {
          id: 1,
          title: 'Meeting with Client',
          start: new Date(2023, 8, 15, 10, 0), // September 15, 2023, 10:00 AM
          end: new Date(2023, 8, 15, 15, 0),   // September 15, 2023, 11:00 AM
        },
        // Add more events here
      ];
      
      const MyCalendar = (props) => (
        <div className="myCustomHeight">
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            views={['week']} // Set to display only the week view
            defaultView="week" // Set the initial view to week
          />
        </div>
      )

    return <MyCalendar></MyCalendar>
}

export default Schedule;

// TODO: create a smart schedule where