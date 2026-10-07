import { useState } from "react";

// TODO : reçoit les props { value, onChange }
function ControlledInput({ value, onChange }) {
  return (
    <input
      type="text"
      // TODO : value et onChange
      value={value}
      onChange={onChange}
      placeholder="Tapez ici..."
      aria-label="Texte libre"
      className="rounded border px-3 py-2"
    />
  );
}

export default function exo6() {
  // TODO : state text (chaîne vide au départ)
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 6</h1>
      {/* TODO : <ControlledInput /> avec value et onChange */}
      <ControlledInput value={text} onChange={handleChange} />
      <p className="mt-4">
        Valeur : <strong>{text || "—"}</strong>
      </p>
    </div>
  );
}