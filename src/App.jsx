import exo1 from './components/exo1';
import exo2 from './components/exo2';

export default function App() {
  return (
    <div className="p-8">
      {exo1()}
      {exo2()}
    </div>
  );
}