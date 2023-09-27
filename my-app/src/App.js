import './App.css';
import Courses from './Courses';
import Schedule from './Schedule';
import courses from './jsonfiles/courses.json'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { Navigation } from './Navigation';
import classes from "./App.module.css";

function App() {

    /* The entry point for the webapp 
    Handles selected subjects (the subjects you have chosen)
    Renders all of the needed components*/

    const [activePage, setActivePage] = useState("Calendar");
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    function activePageHandler(page) {
        setActivePage(page);
    }

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
        <div className='App'>
            <div className={classes.container}>
            <div className={classes.left}>
                <Navigation
                activePage={activePage}
                activePageHandler={activePageHandler}
                />
            </div>
            <div className={classes.right}>
                {activePage === "Calendar" && <><p>Calendar</p><Schedule subjects={selectedSubjects}></Schedule></>}
                {activePage === "Courses" && <Courses subjects={courses} selected={selectedSubjects} changeSelected={onSetSelectedSubjects}></Courses>}
            </div>
            </div>
        <a href="mailto:erlinhol@uio.no">Kontakt Erling Holte på mail</a>
        </div>
        
        
    );
}

export default App;
// 
