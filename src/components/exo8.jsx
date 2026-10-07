import { useState } from "react";

export default function exo8() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Dune", watched: true, },
    { id: 2, title: "Interstellar", watched: false },
    { id: 3, title: "Oppenheimer", watched: false },
  ]);
  let visibleMovies = movies; // TODO : calcule visibleMovies avec filters[filter] (pas un state !)
  // TODO : state filter ("all" | "watched" | "unwatched")
  const [filterMovie, setFilterMovie] = useState("all");

  // TODO : crée l'objet filters (all, watched, unwatched)
  switch (filterMovie) {
  case "watched":
    visibleMovies = movies.filter((movie) => movie.watched);
    break;
    case "unwatched":
    visibleMovies = movies.filter((movie) => !movie.watched);
    break;
  };
  
    const toggleWatched = (id) => {
      setMovies((prev) => prev.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      ));
    };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 8</h1>

      <div className="mb-4 flex gap-2">
        {/* TODO : 3 boutons qui appellent setFilter, avec le compteur entre parenthèses,
            un style différent pour le filtre actif et aria-pressed */}
        <button className="rounded border px-3 py-1" onClick={() => setFilterMovie("all")}>Tous ({movies.length})</button>
        <button className="rounded border px-3 py-1" onClick={() => setFilterMovie("watched")}>Vus ({movies.filter((movie) => movie.watched).length})</button>
        <button className="rounded border px-3 py-1" onClick={() => setFilterMovie("unwatched")}>À voir ({movies.filter((movie) => !movie.watched).length})</button>
      </div>

      <ul className="space-y-1">
        {/* TODO : .map() sur visibleMovies, affiche 🟢 ou ⚪ + le titre */}
        {/* BONUS : un bouton par film qui bascule watched ( + .map) */}
        {visibleMovies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title} {movie.watched ? "🟢 Vu" : "⚪ À voir"}</strong>
            <button
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
              onClick={() => toggleWatched(movie.id)}
            >
              {movie.watched ? "Marquer à voir" : "Marquer vu"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}