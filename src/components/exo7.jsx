function UncontrolledInput({ name, placeholder, buttonText, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO : empêche le rechargement de la page
    // TODO : récupère la valeur avec new FormData(e.currentTarget).get(name)
    //console.log(new FormData(e.currentTarget).get(name));
    const formData = new FormData(e.currentTarget);
    const value = formData.get(name);
    // TODO : si la valeur (trim) n'est pas vide, appelle onSubmit(valeur)
    if (typeof value === "string" && value.trim() !== "") {
      onSubmit(value.trim());
    }
    // TODO : vide le formulaire avec e.currentTarget.reset()
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        // TODO : name, placeholder et required
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        className="rounded border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {/* TODO : buttonText */}
        {buttonText}
      </button>
    </form>
  );
}

export default function exo7() {
  const handleNameSubmit = (name) => {
    // TODO : affiche `Bonjour, ${name} !` dans une alerte
    alert(`Bonjour, ${name} !`);
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 7</h1>
      {/* TODO : <UncontrolledInput /> avec toutes ses props */}
        <UncontrolledInput
          name="username"
          placeholder="Pierre Paul"
          buttonText="Valider"
          onSubmit={handleNameSubmit}
        />
    </div>
  );
}