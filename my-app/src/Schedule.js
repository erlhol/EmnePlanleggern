import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

function Schedule() {
    // Setup the localizer by providing the moment (or globalize, or Luxon) Object
    // to the correct localizer.
    const localizer = momentLocalizer(moment) // or globalizeLocalizer

    const MyCalendar = (props) => (
    <div className="myCustomHeight">
        <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        />
    </div>
    )

    return <h1>Schedule</h1>
}

export default Schedule;

// TODO: create a smart schedule where