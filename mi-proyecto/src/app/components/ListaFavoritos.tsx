
"use client";
import React from "react";
import { useState } from "react";
import TarjetaPokemon from "../components/TarjetaPokemon";
import { useFavorites } from "../hooks/useFavorites";


export default function ListaFavoritos() {
  const { data: favorites, isLoading: isLoadingFavorites } = useFavorites();


    return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 p-15">
                {favorites?.map( (pokemon) => (
                <TarjetaPokemon key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
      </div>
    )
  }

  

  