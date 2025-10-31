"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PokemonCardSkeleton from '../loading';
import usePokemon from "../hooks/usePokemon";


export default function TarjetaPokemon({id}) {
    const router = useRouter();
  
    const { pokemon, isLoading, isError } = usePokemon(id);
  
    if (isLoading) {
      return <PokemonCardSkeleton />;
    }
    
    if (isError) {
      return <div className="text-red-500">Error al cargar</div>;
    }
  
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