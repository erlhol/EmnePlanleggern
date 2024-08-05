import React from "react";
import { useNavigate } from "react-router-dom";
import { IconCalendarEvent, IconBooks } from "@tabler/icons-react";
import classes from "../../App.module.css";
import { Group } from "@mantine/core";
import { useState } from "react";

const data = [
  { link: "/schedule", label: "Schedule", icon: IconCalendarEvent },
  { link: "/courses", label: "Courses", icon: IconBooks },
];

export function Navigation() {
  const [active, setActive] = useState("Schedule");
  const navigate = useNavigate();

  const links = data.map(item => (
    <div
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={event => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </div>
  ));

  return (
    <div className={classes.navbarMain}>
      <Group className={classes.header} justify="space-between"></Group>
      {links}
    </div>
  );
}
