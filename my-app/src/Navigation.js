import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SchoolIcon from "@mui/icons-material/School";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = value => {
    navigate(value);
  };
  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar />
      <List>
        <ListItemButton
          onClick={() => handleClick("/schedule")}
          selected={location.pathname === "/schedule"}
        >
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary={"Calendar"} />
        </ListItemButton>

        <ListItemButton
          onClick={() => handleClick("/courses")}
          selected={location.pathname === "/courses"}
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary={"Courses"} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
