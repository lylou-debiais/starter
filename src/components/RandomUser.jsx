import { useState } from "react";
import useFetch from "../hooks/useFetch";

function RandomUser() {
  const [gender, setGender] = useState("");
  const url = `https://randomuser.me/api/?results=6&nat=fr&gender=${gender}`;
  const { data, error, isLoading } = useFetch(url);

  return (
    <div>
      <label htmlFor="gender">Genre : </label>
      <select
        id="gender"
        value={gender}
        onChange={(event) => setGender(event.target.value)}
      >
        <option value="">Tous</option>
        <option value="female">Femmes</option>
        <option value="male">Hommes</option>
      </select>

      {isLoading && <p>Chargement…</p>}
      {error && <p role="alert">Erreur : {error.message}</p>}
      {data && (
        <ul>
          {data.results.map((user) => (
            <li key={user.login.uuid}>
              <img
                src={user.picture.large}
                alt={`Photo de ${user.name.first} ${user.name.last}`}
              />
              <p>
                {user.name.first} {user.name.last}
              </p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RandomUser;
