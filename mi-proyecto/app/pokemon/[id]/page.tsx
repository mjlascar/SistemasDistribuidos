"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCardSkeleton from './loading';
import React from "react";

export default function PokemonData() {
  const params = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const fetchPokemon = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${params.id}/`
          );
          setPokemon(response.data);
        } catch (error) {
          console.error("Error al cargar el Pokémon:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPokemon();
    }
  }, [params.id]); // El efecto depende del ID en la URL

  // estados de carga y error
  if (loading) {
    return (
      <div className="w-1/3 mx-auto">
        <PokemonCardSkeleton />
      </div>
    );
  }

  if (!pokemon) {
    return <div>No se pudo encontrar el Pokémon.</div>;
  }

  // Renderizado
  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center p-5">
      
      <img
        src={pokemon.sprites.front_default}
        alt={`Foto de ${pokemon.name}`}
        width={240}
        height={240}
      />
      <p className="text-lg text-gray-500">
        N.º {pokemon.id.toString().padStart(3, '0')}
      </p>
      <h1 className="text-4xl font-bold">{pokemon.name.toUpperCase()}</h1>
      
      <div className="flex gap-2 mt-2">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className="px-4 py-1 bg-gray-200 text-gray-800 text-base font-bold rounded-full"
          >
            {type.name.toUpperCase()}
          </span>
        ))}
      </div>
      
      <div className="text-center mt-4 text-lg">
        <p>Peso: <strong>{pokemon.weight / 10} kg</strong></p>
        <p>Altura: <strong>{pokemon.height / 10} m</strong></p>
      </div>
      
    </div>
  );
}