import { useState } from "react";
import useFetch from "./hooks/useFetch";

function App() {
  // Texte écrit dans le champ de recherche.
  const [nameInput, setNameInput] = useState("");
  // Nom utilisé pour construire l'URL après validation.
  const [search, setSearch] = useState("");
  // Genre sélectionné dans le menu.
  const [gender, setGender] = useState("");

  // On construit l'URL avec le nom et le genre choisis.
  const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(search)}&gender=${gender}`;
  // Le hook envoie la requête et renvoie les trois états.
  const { data, error, isLoading } = useFetch(url);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(nameInput.trim());
  };

  return (
    <main className="min-h-screen bg-green-50 px-4 py-6 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-2xl">
      <header className="mb-6 rounded-lg bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-bold text-green-700">
        Personnages de Rick et Morty
      </h1>
      <p className="mt-1 text-sm text-gray-500">Le fil des personnages</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mb-6 rounded-lg bg-white p-4 shadow-sm"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            placeholder="Rechercher un personnage"
            className="min-w-0 flex-1 rounded border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
          />
          <button
            type="submit"
            className="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
          >
            Rechercher
          </button>
        </div>
        <select
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          className="mt-3 w-full rounded border border-gray-300 bg-white px-3 py-2 outline-none focus:border-green-500"
        >
          <option value="">Tous les genres</option>
          <option value="female">Femmes</option>
          <option value="male">Hommes</option>
          <option value="genderless">Sans genre</option>
        </select>
      </form>

      {isLoading && (
        <p className="rounded-lg bg-white p-5 text-center text-gray-600 shadow-sm">
          Chargement...
        </p>
      )}

      {error && (
        <p className="rounded-lg bg-white p-5 font-semibold text-red-700 shadow-sm">
          Erreur : {error.message}
        </p>
      )}

      {data && (
        <ul className="space-y-4">
          {data.results.map((character) => (
            <li
              key={character.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
              <img
                className="h-12 w-12 rounded-full"
                src={character.image}
                alt={character.name}
              />
              <div>
                <h2 className="font-bold">{character.name}</h2>
                <p className="text-sm text-gray-500">Personnage de la série</p>
              </div>
              </div>
              <img
                className="max-h-96 w-full rounded object-cover"
                src={character.image}
                alt={`Portrait de ${character.name}`}
              />
              <p className="mt-3 text-sm text-gray-600">
                Espèce : {character.species}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Statut : {character.status}
              </p>
            </li>
          ))}
        </ul>
      )}
      </div>
    </main>
  );
}

export default App;
