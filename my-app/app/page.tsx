import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { BasicAppShell } from '@/components/BasicAppShell';

export default function HomePage() {
  return (
    <>
      <BasicAppShell/>
      <ColorSchemeToggle />
    </>
  );
}
