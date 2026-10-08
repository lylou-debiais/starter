import { useState } from "react";

export default function Tache() {
  const [users, setUsers] = useState([
    { id: 1, name: "Faire les courses", active: true },
    { id: 2, name: "Lire 20 pages", active: false },
  ]);

  const addTask = (e) => {
    e.preventDefault();

    const value = new FormData(e.currentTarget).get("username");

    if (typeof value === "string" && value.trim()) {
      setUsers((prev) => [
        ...prev,
        { id: Date.now(), name: value, active: false },
      ]);
    }

    e.currentTarget.reset(); // vide le formulaire
  };

  const toggleUser = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  };

  return (
    // liste des taches
    <div>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={user.active}
                onChange={() => toggleUser(user.id)}
                className="h-4 w-4"
                aria-label={`Changer le statut de ${user.name}`}
              />
            </div>

            <span className={user.active ? "line-through" : ""}>
              {user.name} {user.active ? "Terminé" : "Active"}
            </span>
          </li>
        ))}
      </ul>

      {/* // Formulaire pour ajouter une nouvelle tâche */}
      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <input
          type="text"
          name="username"
          placeholder="Ajouter une tâche"
          className="rounded border p-2"
        />

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
