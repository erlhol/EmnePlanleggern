import React from "react";

export function Navigation(props) {
  return (
    <div>
      <p
        onClick={() => props.activePageHandler("Calendar")}
      >Calendar</p>
      <p
        onClick={() => props.activePageHandler("Courses")}
      >Courses </p>
    </div>
  );
}
