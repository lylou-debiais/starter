import { useState } from "react";

export default function Tache() {
  const [users, setUsers] = useState([
    { id: 1, name: "Faire les courses", active: true },
    { id: 2, name: "Lire 20 pages", active: false },
  ]);
  const [filterTask, setFilterTask] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

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

  const deleteTask = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // On ouvre le mode modification et on copie le nom dans le brouillon.
  const startEditing = (user) => {
    setEditingId(user.id);
    setDraft(user.name);
  };

  // Annuler ferme le formulaire sans modifier la tâche.
  const cancelEditing = () => {
    setEditingId(null);
    setDraft("");
  };

  // Valider remplace l'ancien nom par le brouillon.
  const saveTask = (e, id) => {
    e.preventDefault();
    const newName = draft.trim();

    // On n'enregistre pas une tâche vide.
    if (!newName) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, name: newName } : user,
      ),
    );
    cancelEditing();
  };

  let visibleTasks = users;

  if (filterTask === "active") {
    visibleTasks = users.filter((user) => !user.active);
  } else if (filterTask === "completed") {
    visibleTasks = users.filter((user) => user.active);
  }

  return (
    // liste des taches
    <div className="min-h-screen bg-[#010102] p-8 text-[#f7f8f8]">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">
          Mes tâches
        </h1>

        <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
            filterTask === "all"
              ? "border-[#5e6ad2] bg-[#5e6ad2] text-white"
              : "border-[#34343a] bg-[#0f1011] text-[#d0d6e0] hover:border-[#5e6ad2]"
          }`}
          onClick={() => setFilterTask("all")}
          aria-pressed={filterTask === "all"}
        >
          Toutes ({users.length})
        </button>
        <button
          type="button"
          className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
            filterTask === "active"
              ? "border-[#5e6ad2] bg-[#5e6ad2] text-white"
              : "border-[#34343a] bg-[#0f1011] text-[#d0d6e0] hover:border-[#5e6ad2]"
          }`}
          onClick={() => setFilterTask("active")}
          aria-pressed={filterTask === "active"}
        >
          Actives ({users.filter((user) => !user.active).length})
        </button>
        <button
          type="button"
          className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
            filterTask === "completed"
              ? "border-[#5e6ad2] bg-[#5e6ad2] text-white"
              : "border-[#34343a] bg-[#0f1011] text-[#d0d6e0] hover:border-[#5e6ad2]"
          }`}
          onClick={() => setFilterTask("completed")}
          aria-pressed={filterTask === "completed"}
        >
          Terminées ({users.filter((user) => user.active).length})
        </button>
      </div>

      <ul className="mb-6 space-y-3">
        {visibleTasks.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-[#23252a] bg-[#0f1011] p-4"
          >
            {editingId === user.id ? (
              <form
                onSubmit={(e) => saveTask(e, user.id)}
                className="flex w-full gap-2"
              >
                {/* draft contient ce que l'étudiante est en train d'écrire. */}
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  autoFocus
                />
                <button type="submit">Valider</button>
                <button type="button" onClick={cancelEditing}>
                  Annuler
                </button>
              </form>
            ) : (
              <>
                <div className="flex min-w-0 items-center gap-3">
                  <input
                    type="checkbox"
                    checked={user.active}
                    onChange={() => toggleUser(user.id)}
                    className="h-4 w-4 accent-[#5e6ad2]"
                    aria-label={`Changer le statut de ${user.name}`}
                  />

                  <span
                    className={`truncate text-base ${
                      user.active
                        ? "text-[#62666d] line-through"
                        : "text-[#f7f8f8]"
                    }`}
                  >
                    {user.name}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEditing(user)}
                    className="text-[#5e6ad2]"
                  >
                    Modifier
                  </button>
                  <button type="button" onClick={() => deleteTask(user.id)}>
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          name="username"
          placeholder="Ajouter une tâche"
          className="min-w-0 flex-1 rounded-md border border-[#34343a] bg-[#0f1011] px-3 py-2 text-[#f7f8f8] outline-none placeholder:text-[#8a8f98] focus:border-[#5e6ad2]"
        />

        <button
          type="submit"
          className="rounded-md bg-[#5e6ad2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#828fff]"
        >
          Ajouter
        </button>
      </form>
      </div>
    </div>
  );
}
