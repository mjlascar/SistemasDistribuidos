"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from '../services/pokeapi';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function usePokemon(id: number) {
  
    const { data: pokemon, isLoading, isError } = useQuery<Pokemon>({
      queryKey: ['pokemon', id], 
      queryFn: () => fetchPokemon(id),
    });
  
    return { pokemon, isLoading, isError };
  }