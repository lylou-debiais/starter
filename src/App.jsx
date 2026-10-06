import exo1 from './components/exo1';
import exo2 from './components/exo2';
import exo3 from './components/exo3';

export default function App() {
  return (
    <div className="p-8">
      {exo1()}
      {exo2()}
      {exo3()}
    </div>
  );
}