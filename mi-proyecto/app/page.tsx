"use client";

import { useEffect, useState } from "react";
import axios from "axios"
import React from "react";
import { useRouter } from "next/navigation";
import PokemonCardSkeleton from './loading';

function LlamadaAPokes({id}) {
  const [pokemon, setPokemon] = useState(null);

  useEffect( () => {
    const fetchPokemon = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      setPokemon(response.data);
    };
    fetchPokemon();
  }, [id]); 

  if (!pokemon) {
    return <PokemonCardSkeleton />;
  }

  const router = useRouter();
  return (
    <div className="justify-items-center border border-gray-400 rounded-md p-5" onClick={() => router.push(`/pokemon/${pokemon.id}`)}>
      <img
        src={pokemon.sprites.front_default}
        alt="su foto"
        width={240}
        height={240}
      />
      <p className="text-sm text-gray-500">N.º {pokemon.id.toString().padStart(3, '0')}</p>
      <h2 className="text-xl font-bold">{pokemon.name.toUpperCase()}</h2>
    </div>
  )
}

export default function Home(){
  const pokemonIds = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="justify-items-center p-5">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {pokemonIds.map( (id) => (
              <LlamadaAPokes key={id} id={id} />
            ))}
          </div>
      </main>
    </div>
  );
}

