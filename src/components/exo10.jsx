import { useState } from "react";

function EditableCard({ value, onSave }) {
  // TODO : state local isEditing (false au départ)
  const [isEditing, setIsEditing] = useState(false);
  // TODO : state local draft (initialisé avec value)
  const [draft, setDraft] = useState(value);

  const startEditing = () => {
    // TODO : recopie value dans draft, puis passe en mode édition
  };

  const cancel = () => {
    // TODO : repasse en mode lecture, sans appeler onSave
  };

  const handleSubmit = (e) => {
    // TODO : e.preventDefault()
    // TODO : si draft.trim() n'est pas vide → onSave(draft.trim()) puis repasse en mode lecture
  };

  return (
    <div className="rounded border p-4">
      {/* TODO : si isEditing → <form onSubmit={handleSubmit}> avec un <input> contrôlé par draft,
          un bouton "Valider" (type="submit") et un bouton "Annuler" (type="button") */}
      {/* TODO : sinon → <span>{value}</span> + bouton "Modifier" (startEditing) */}
    </div>
  );
}

export default function exo10() {
  // TODO : state username ("Alice" au départ)
  const [username, setUsername] = useState("Alice");

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 10</h1>
      {/* TODO : <EditableCard /> avec value et onSave */}
        <EditableCard value={username} onSave={setUsername} />
      <p className="mt-4 text-sm text-gray-500">
        Valeur stockée dans le parent : <strong>{/* TODO */}</strong>
      </p>
    </div>
  );
}