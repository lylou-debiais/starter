import useFetch from "./hooks/useFetch";

const { data, error, isLoading, refetch } = useFetch(
  "https://rickandmortyapi.com/api/",
);

if (isLoading) return <p>Chargement...</p>;
if (error) return <p>Erreur : {error.message}</p>;
const characters = data.results[0];

function App() {
  return (
    <>
      <h1>Rick and Morty</h1>
    </>
  );
}

export default App;