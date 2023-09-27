import React from "react";

export function Navigation(props) {
  return (
    <div>
      <p
        label="Calendar"
        active={props.activePage == "Calendar"}
        onClick={() => props.activePageHandler("Calendar")}
      >Calendar</p>
      <p
        label="Courses"
        active={props.activePage == "Courses"}
        onClick={() => props.activePageHandler("Courses")}
      >Courses </p>
    </div>
  );
}
