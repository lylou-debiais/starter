import { useState } from "react";

function UncontrolledInput({ name, placeholder, buttonText, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get(name);
    if (typeof value === "string" && value.trim() !== "") {
      onSubmit(value.trim());
    }
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        className="rounded border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default function ajout() {
    const [text, setText] = useState("");
  const handleNameSubmit = (name) => {
    setText(name);
  };

  return (
    <div>
        <p>{text}</p>
        <UncontrolledInput
          name="name"
          placeholder="Saisir une nouvelle tâche…"
          buttonText="Ajouter"
          onSubmit={handleNameSubmit}
        />
    </div>
  );
}