import "./App.css";
import { useEffect } from "react";
import Courses from "./pages/Courses";
import Schedule from "./pages/Schedule";
import courses from "./jsonfiles/courses.json";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Navigation } from "./Navigation";
import classes from "./App.module.css";
import { generateRandomColor } from "./utilities/utility";

function App() {
  /* The entry point for the webapp
    Handles selected subjects (the subjects you have chosen)
    Renders all of the needed components*/

  const [activePage, setActivePage] = useState("Calendar");
  const [selectedSubjects, setSelectedSubjects] = useState(
    JSON.parse(localStorage.getItem("selectedSubjects")) || []
  );

  // Load selectedSubjects from localStorage when the component mounts
  useEffect(() => {
    const savedSubjects = localStorage.getItem("selectedSubjects");
    if (savedSubjects) {
      setSelectedSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  // Save selectedSubjects to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedSubjects", JSON.stringify(selectedSubjects));
  }, [selectedSubjects]);

  function activePageHandler(page) {
    setActivePage(page);
  }

  const onSetSelectedSubjects = (subject, should_add) => {
    if (should_add) {
      setSelectedSubjects(previousValue => [
        ...previousValue,
        [subject, generateRandomColor()],
      ]);
    } else {
      setSelectedSubjects(previousValue =>
        previousValue.filter(s => s[0] !== subject)
      );
    }
  };

  return (
    <div className="App">
      <div className={classes.container}>
        <div className={classes.left}>
          <Navigation
            activePage={activePage}
            activePageHandler={activePageHandler}
          />
        </div>
        <div className={classes.right}>
          {activePage === "Calendar" && (
            <div>
              <Schedule
                allSubjects={courses}
                selected={selectedSubjects}
                changeSelected={onSetSelectedSubjects}
              ></Schedule>
            </div>
          )}
          {activePage === "Courses" && (
            <Courses
              subjects={courses}
              selected={selectedSubjects}
              changeSelected={onSetSelectedSubjects}
            ></Courses>
          )}
        </div>
      </div>
      <a href="mailto:erlinhol@uio.no">Kontakt Erling Holte på mail</a>
    </div>
  );
}

export default App;
