
import tache from './components/Tache';


export default function App() {
  return (
    <div className="relative">
      <img
        src="./src/assets/logo.svg.svg"
        alt="Logo"
        className="absolute left-4 top-4 h-12 w-12 brightness-0 invert"
      />
      {tache()}
    </div>
  );
}