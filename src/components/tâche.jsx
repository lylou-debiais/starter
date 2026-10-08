import { useState } from "react";

const fruits = [
  { key:crypto.randomUUID(), name: "Faire les courses" },
  { key:crypto.randomUUID(), name: "Lire 20 pages" },
];

export default function Tache() {

  const [items] = useState(fruits);



  return (
    <div>
      <ul>{items.map((item) => (
        <li key={item.key}>{item.name}</li>
      ))}</ul>
    </div>
  );
}