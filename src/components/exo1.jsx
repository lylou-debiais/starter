import { useState } from "react";

function LikeButton({ count, onLike }) {
  // TODO : le bouton appelle onLike au clic
  
  // TODO : affiche le compteur (count) dans la pastille
  return (
    <button className="relative rounded bg-pink-500 px-4 py-2 text-white" onClick={onLike}>
      ❤️ J'aime
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
        {/* TODO */}
        {count}
      </span>
    </button>
  );
}

export default function exo1() {
  // TODO : déclare le state likes (initialisé à 0)
  const [count, setCount] = useState(0);
  // TODO : déclare la fonction handleLike
  const handleLike = () => {setCount((prev) => prev + 1)};

  return (
    <div className="p-8">
      <h1 className="mb-4 text-xl">Exercice 1</h1>
      <LikeButton count={count} onLike={handleLike} />
    </div>
  );
}