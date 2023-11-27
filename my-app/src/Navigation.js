import React from "react";
import calendar_icon from "./icons/calendar-clock.png";
import learning_icon from "./icons/learning.png";
import { useNavigate, useLocation } from "react-router-dom";

function ImageWithStyle({ onClick, icon, isActive, name }) {
  const imageStyle = {
    maxWidth: "60px",
    maxHeight: "60px",
    width: "auto",
    height: "auto",
  };

  return (
    <div style={{ backgroundColor: isActive ? "lightblue" : "transparent" }}>
      <img onClick={onClick} style={imageStyle} src={icon} alt="img" />
      <p>{name}</p>
    </div>
  );
}

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = value => {
    navigate(value);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <ImageWithStyle
        onClick={() => handleClick("/schedule")}
        icon={calendar_icon}
        isActive={location.pathname === "/schedule"}
        name={"Schedule"}
      />
      <ImageWithStyle
        onClick={() => handleClick("/courses")}
        icon={learning_icon}
        isActive={location.pathname === "/courses"}
        name={"Courses"}
      />
    </div>
  );
}
