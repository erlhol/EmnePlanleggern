import './App.css';
import Courses from './Courses';
import Schedule from './Schedule';
import courses from './jsonfiles/courses.json'
import 'react-big-calendar/lib/css/react-big-calendar.css';

function App() {

    return (
        <div className="App">
        <p>Calendar</p>
        <Schedule></Schedule>
        <Courses subjects={courses}></Courses>
        <a href="mailto:erlinhol@uio.no">Kontakt Erling Holte på mail</a>
        </div>
    );
}

export default App;
