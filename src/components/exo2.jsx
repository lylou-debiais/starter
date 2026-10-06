import { useState } from "react";


// TODO : déstructure la prop { onColorSelect }
function ColorPicker( { onColorSelect }) {
  return (
    <div className="mb-4 flex gap-2">
      {/* TODO : onClick → onColorSelect("red") */}
      <button className="rounded bg-red-500 px-3 py-1 text-white" onClick={() => onColorSelect("red")}>Rouge</button>
      {/* TODO : onClick → onColorSelect("blue") */}
      <button className="rounded bg-blue-500 px-3 py-1 text-white" onClick={() => onColorSelect("blue")}>Bleu</button>
    </div>
  );
}

export default function exo() {
  // TODO : state bgColor (initialisé à "white")
  const [bgColor, setBgColor] = useState("white");
  // TODO : fonction handleColorChange(color) qui met à jour bgColor
    const handleColorChange = (color) => {
        setBgColor(color);
    }
  return (
    // TODO : ajoute style={{ backgroundColor: bgColor }}
    <div className="min-h-screen p-8 transition-colors bg-(--color)" style={{"--color":'var(--clr-${bgColor})' }}>
      <h1 className="mb-4 text-xl">Exercice 2</h1>
      {/* TODO : affiche <ColorPicker /> avec sa prop */}
        <ColorPicker onColorSelect={handleColorChange} />
      <p>
        Couleur actuelle : <strong>{bgColor}</strong>
      </p>
    </div>
  );
}