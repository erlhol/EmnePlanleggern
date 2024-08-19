'use client';
import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { NavbarSimple } from './NavBar/NavbarSimple';
import { Schedule } from '../components/Schedule/Schedule'

export function BasicAppShell() {

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Text>Emneplanleggern</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavbarSimple />
      </AppShell.Navbar>
      <AppShell.Main>
        <Schedule />
      </AppShell.Main>
    </AppShell>
  );
}