import './App.css';
import Courses from './Courses';
import Schedule from './Schedule';
import courses from './jsonfiles/courses.json'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

function App() {

    /* The entry point for the webapp 
    Handles selected subjects (the subjects you have chosen)
    Renders all of the needed components*/

    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const onSetSelectedSubjects = (subject,should_add) => {
        if (should_add) {
            setSelectedSubjects( previousValue => 
                [...previousValue, subject]
            )}
        else {
            setSelectedSubjects ( previousValue =>
                previousValue.filter((s) =>
                s !== subject)
            )
        }
    }

    return (
        <div className="App">
        <p>Calendar</p>
        <Schedule subjects={selectedSubjects}></Schedule>
        <Courses subjects={courses} selected={selectedSubjects} changeSelected={onSetSelectedSubjects}></Courses>
        <a href="mailto:erlinhol@uio.no">Kontakt Erling Holte på mail</a>
        </div>
    );
}

export default App;
// 
