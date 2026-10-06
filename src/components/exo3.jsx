import { useState } from "react";

export default function exo3() {
  // TODO : state isDarkMode (false au départ)
  const [isDarkMode, setIsDarkMode] = useState(false);
  // TODO : fonction toggleDarkMode (utilise la forme prev => !prev)
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    }

  // TODO : donnée dérivée themeClass (pas de useState pour ça !)
    const themeClass = isDarkMode ? "dark" : "";

  return (
    // TODO : ajoute themeClass à la className
    <div className={`text-fg bg-bg min-h-screen p-8 transition-colors ${themeClass}`}>
      <h1 className="mb-4 text-xl">Exercice 3</h1>
      <button className="rounded border px-4 py-2" onClick={toggleDarkMode}>
        {/* TODO : texte conditionnel selon isDarkMode */}
        {isDarkMode ? "light" : "dark"}
      </button>
      {/* TODO : rendu conditionnel avec && */}
        {isDarkMode && <p>Hello Dark Mode</p>}
    </div>
  );
}