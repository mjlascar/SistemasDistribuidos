"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios"



function LlamadaAPokes({id}) {
  const [pokemon, setPokemon] = useState(null);
  const [contador, setContador] = useState<number>(0);

  useEffect( () => {
    const fetchPokemon = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      setPokemon(response.data);
    };
    fetchPokemon();
  }, [id]); 

  if (!pokemon) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="justify-items-center border border-gray-400 rounded-md p-2" onClick={() => setContador(contador + 1)}>
      <h1>Clickeado {contador} veces</h1>
      <img
        src={pokemon.sprites.front_default}
        alt="su foto"
        width={240}
        height={240}
      />
      <p className="text-sm text-gray-500">N.º {pokemon.id.toString().padStart(3, '0')}</p>
      <h2 className="text-xl font-bold">{pokemon.name.toUpperCase()}</h2>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map(({ type }) => (
          <span key={type.name} className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-bold rounded-full">
            {(type.name.toUpperCase())}
          </span>
        ))}
      </div>
      <div className="text-center mt-4 text-sm">
        <p>Peso: <strong>{pokemon.weight / 10} kg</strong></p>
        <p>Altura: <strong>{pokemon.height / 10} m</strong></p>
      </div>
    </div>
  )
}

export default function Home(){
  const pokemonIds = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="justify-items-center p-10">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
            className="dark:invert "
            src="/avellan.svg"
            alt="Avellan logo"
            width={320}
            height={38}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {pokemonIds.map( (id) => (
              <LlamadaAPokes key={id} id={id} />
            ))}
          </div>
      </main>
    </div>
  );
}

