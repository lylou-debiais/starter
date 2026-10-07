import exo1 from './components/exo1';
import exo2 from './components/exo2';
import exo3 from './components/exo3';
import exo4 from './components/exo4';
import exo5 from './components/exo5';
import exo6 from './components/exo6';
import exo7 from './components/exo7';
import exo8 from './components/exo8';

export default function App() {
  return (
    <div className="p-8">
      {exo1()}
      {exo2()}
      {exo3()}
      {exo4()}
      {exo5()}
      {exo6()}
      {exo7()}
      {exo8()}
    </div>
  );
}