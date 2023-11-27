import React from "react";
import calendar_icon from "./icons/calendar-clock.png";
import learning_icon from "./icons/learning.png";

function ImageWithStyle({ pageHandler, icon, isActive, name }) {
  const imageStyle = {
    maxWidth: "60px",
    maxHeight: "60px",
    width: "auto",
    height: "auto",
  };

  return (
    <div style={{ backgroundColor: isActive ? "lightblue" : "transparent" }}>
      <img onClick={pageHandler} style={imageStyle} src={icon} alt="img" />
      <p>{name}</p>
    </div>
  );
}

export function Navigation(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <ImageWithStyle
        pageHandler={() => props.activePageHandler("Calendar")}
        icon={calendar_icon}
        isActive={props.activePage === "Calendar"}
        name={"Calendar"}
      />
      <ImageWithStyle
        pageHandler={() => props.activePageHandler("Courses")}
        icon={learning_icon}
        isActive={props.activePage === "Courses"}
        name={"Courses"}
      />
    </div>
  );
}
