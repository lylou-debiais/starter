import { useState } from "react";

const fruits = [
  { key:crypto.randomUUID(), name: "Pomme" },
  { key:crypto.randomUUID(), name: "Banane" },
  { key:crypto.randomUUID(), name: "Poire" },
];

export default function exo4() {
  // TODO : state items (Pomme, Banane), chacun avec un id aléatoire
  const [items, setItems] = useState(fruits);
  // Astuce : useState(() => [...]) n'exécute la fonction qu'au premier rendu
  // (sinon randomUUID serait rappelé à chaque rendu pour rien)

  const addItem = () => {
    // ⚠️ Interdit : items.push(...) puis setItems(items)
    // TODO : crée d'abord un objet Cerise avec un id unique, puis ajoute-le
    // avec setItems((currentItems) => [...currentItems, newItem])
    const newItem = { key: crypto.randomUUID(), name: "Cerise" };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 4</h1>
      <button
        onClick={addItem}
        className="mb-4 rounded bg-green-500 px-4 py-2 text-white"
      >
        Ajouter une Cerise 🍒
      </button>

      <ul className="list-disc pl-5">{items.map((item) => (
        <li key={item.key}>{item.name}</li>
      ))}</ul>
    </div>
  );
}