import { useEffect, useState } from "react";

const API_URL = "https://api.tvmaze.com/shows/43031?embed[]=episodes&embed[]=cast&embed[]=crew&embed[]=images";


function useTvMazeShows() {
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchShows() {
      setStatus("loading");
      setError("");

      try {
        const showResponse = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!showResponse.ok) {
          throw new Error(`La requête a échoué (${showResponse.status}).`);
        }

        const show = await showResponse.json();

        setShows([show]);
        setStatus("success");
      } catch (requestError) {
        if (requestError.name === "AbortError") {
          return;
        }

        setError(requestError.message);
        setStatus("error");
      }
    }

    fetchShows();

    return () => controller.abort();
  }, []);

  return { shows, status, error };
}

function App() {
  const { shows, status, error } = useTvMazeShows();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            TVMaze explorer
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Trouvez votre prochaine série
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            Résultats chargés depuis l&apos;API TVMaze avec le hook{" "}
            <code className="text-cyan-300">useTvMazeShows</code>.
          </p>
        </header>

        {status === "loading" && (
          <p className="text-slate-400">Chargement des résultats...</p>
        )}

        {status === "error" && (
          <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            Impossible de charger les séries : {error}
          </p>
        )}

        {status === "success" && shows.length === 0 && (
          <p className="text-slate-400">Aucun résultat pour Reacher.</p>
        )}

        {status === "success" && shows.length > 0 && (
          <section aria-live="polite">
            <h2 className="mb-5 text-xl font-semibold">
              Résultats pour &quot;Reacher&quot;
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {shows.map((show) => (
                <article
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
                  key={show.id}
                >
                  {show.image?.medium ? (
                    <img
                      alt={`Affiche de ${show.name}`}
                      className="aspect-[2/3] w-full object-cover"
                      src={show.image.medium}
                    />
                  ) : (
                    <div className="flex aspect-[2/3] items-center justify-center bg-slate-800 text-slate-500">
                      Pas d&apos;affiche
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="truncate text-lg font-semibold">
                      {show.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {show.premiered?.slice(0, 4) || "Date inconnue"}
                      {show.rating?.average
                        ? ` · ★ ${show.rating.average}`
                        : ""}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <h2 className="mb-5 mt-10 text-xl font-semibold">
              Images de Reacher
            </h2>
            {["poster", "background", "typography"].map((imageType) => {
              const typeImages = (shows[0]._embedded?.images || []).filter(
                (image) =>
                  image.type === imageType &&
                  image.resolutions?.original?.url,
              );

              return (
                <section className="mb-8" key={imageType}>
                  <h3 className="mb-4 text-lg font-semibold text-cyan-400">
                    {imageType}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    {typeImages.map((image) => (
                      <img
                        alt=""
                        className={`w-full rounded-2xl bg-slate-900 object-contain transition duration-300 hover:scale-105 ${
                          imageType === "poster"
                            ? "aspect-[2/3]"
                            : "aspect-video"
                        }`}
                        key={image.id}
                        src={image.resolutions.original.url}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
            <h2 className="mb-5 mt-10 text-xl font-semibold">
              Épisodes de Reacher
            </h2>
            {Object.entries(
              shows[0]._embedded?.episodes?.reduce((seasons, episode) => {
                const season = seasons[episode.season] || [];
                season.push(episode);
                seasons[episode.season] = season;
                return seasons;
              }, {}) || {},
            )
              .sort(
                ([firstSeason], [secondSeason]) =>
                  Number(firstSeason) - Number(secondSeason),
              )
              .map(([seasonNumber, seasonEpisodes]) => (
              <section
                className="mb-8 rounded-2xl border border-slate-800 p-5"
                key={seasonNumber}
              >
                <h3 className="mb-4 text-2xl font-semibold text-cyan-400">
                  Saison {seasonNumber}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {seasonEpisodes.map((episode) => (
                    <article
                      className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                      key={episode.id}
                    >
                      <p className="text-sm font-semibold text-slate-400">
                        Épisode {episode.number}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold">
                        {episode.name}
                      </h4>
                      <p className="mt-1 text-sm text-slate-400">
                        {episode.airdate || "Date inconnue"}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
            <h2 className="mb-5 mt-10 text-xl font-semibold">Casting</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {shows[0]._embedded?.cast?.map(({ person, character }) => (
                <article
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
                  key={person.id}
                >
                  {person.image?.medium ? (
                    <img
                      alt={`Photo de ${person.name}`}
                      className="aspect-[2/3] w-full object-cover"
                      src={person.image.medium}
                    />
                  ) : (
                    <div className="flex aspect-[2/3] items-center justify-center bg-slate-800 text-slate-500">
                      Pas de photo
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{person.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Rôle : {character.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <h2 className="mb-5 mt-10 text-xl font-semibold">Personnages</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shows[0]._embedded?.cast?.map(({ person, character }) => (
                <article
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                  key={`${person.id}-${character.id}`}
                >
                  <h3 className="text-lg font-semibold">{character.name}</h3>
                  <p className="mt-1 text-sm text-cyan-400">
                    Joué par {person.name}
                  </p>
                </article>
              ))}
            </div>
            <h2 className="mb-5 mt-10 text-xl font-semibold">
              Équipe technique
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shows[0]._embedded?.crew?.map(({ person, type }) => (
                <article
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                  key={`${person.id}-${type}`}
                >
                  <h3 className="text-lg font-semibold">{person.name}</h3>
                  <p className="mt-1 text-sm text-cyan-400">{type}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;