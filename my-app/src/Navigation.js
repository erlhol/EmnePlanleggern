import React from "react";

export function Navigation(props) {
  return (
    <div style={ {
      display: 'flex',
      flexDirection: 'column'}}>
      <p>
      <button
        onClick={() => props.activePageHandler("Calendar")}
      >Calendar</button>
      </p>
      <p>
      <button
        onClick={() => props.activePageHandler("Courses")}
      >Courses </button>
      </p>
    </div>
  );
}
