import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconCalendar,
  IconBook,
  IconSwitchHorizontal,
  IconFingerprint,
  IconLogout,
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';

const data = [
  { link: '', label: 'Schedule', icon: IconCalendar },
  { link: '', label: 'Courses', icon: IconBook },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Schedule');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}