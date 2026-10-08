import tache from './components/tâche';
import ajout from './components/ajout';


export default function App() {
  return (
    <div className="p-8">
      {tache()}
      {ajout()}

    </div>
  );
}