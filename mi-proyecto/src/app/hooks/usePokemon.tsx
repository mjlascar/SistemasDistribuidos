"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from '../services/pokeapi';

type PokemonQueryOptions = {
  enabled?: boolean; //parametro opcional
};

export default function usePokemon(id: number | undefined, options?: PokemonQueryOptions) {
  
    const { data: pokemon, isLoading, isError } = useQuery({
      queryKey: ['pokemon', id], 
      queryFn: () => fetchPokemon(id!),
      ...options,
    });
  
    return { pokemon, isLoading, isError };
  }