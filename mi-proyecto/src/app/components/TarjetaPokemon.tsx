"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PokemonCardSkeleton from '../loading';
import usePokemon from "../hooks/usePokemon";
import BotonFav from "./BotonFav";
import { Pokemon } from "../lib/database";

type TarjetaPokemonProps = {
  id?: number;         // 'id' es opcional
  pokemon?: Pokemon; // 'pokemon' es opcional
};

export default function TarjetaPokemon({id, pokemon: pokemonProp}: TarjetaPokemonProps) {
  const router = useRouter();
  
  const shouldFetch = !!id && !pokemonProp; // Hacemos fetch si nos pasan 'id' Y NO nos pasan pokemonProp

  const { pokemon: fetchedPokemon, isLoading, isError } = usePokemon(id, { enabled: shouldFetch,  }); 
  const pokemon = pokemonProp || fetchedPokemon;

  if (isLoading && shouldFetch) {
    return <PokemonCardSkeleton />;
  }
  
  if (isError && shouldFetch) {
    return null;
  }

    return (
      <div className="justify-items-center border border-gray-400 rounded-md p-5">
        <div className="justify-items-center border border-gray-400 rounded-md p-5" onClick={() => router.push(`/pokemon/${pokemon?.id}`)}>
          <img
            src={pokemon?.sprites.front_default}
            alt="su foto"
            width={240}
            height={240}
          />
          <p className="text-sm text-gray-500">N.º {pokemon?.id.toString().padStart(3, '0')}</p>
          <h2 className="text-xl font-bold">{pokemon?.name.toUpperCase()}</h2>
            {/* si 'nombreFav' existe, muestra este bloque */}
          {pokemon.nombreFav && (
            <div className="mt-4 pt-2 border-t border-gray-700 text-center">
              <p className="text-xs text-yellow-500 font-semibold">Apodo:</p>
              <h3 className="text-lg font-semibold text-yellow-400">{pokemon.nombreFav}</h3>
            </div>
          )}
            {/* si 'descripcionFav' existe, muestra este bloque */}
          {pokemon.descripcionFav && (
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-400">Descripcion:</p>
              <p className="text-sm text-gray-300 italic">
                "{pokemon.descripcionFav}"
              </p>
            </div>
          )}

        </div>
        <BotonFav key={id} pokemon={pokemon} />
      </div>
    )
  }

