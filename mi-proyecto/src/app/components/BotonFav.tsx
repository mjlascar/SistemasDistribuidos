"use client";

import React from "react";
import { useFavoriteById, useAddFavorite, useRemoveFavorite, useFavorites } from "../hooks/useFavorites";


export default function BotonFav({pokemon}) {
    const { data: favorites, isLoading: isLoadingFavorites } = useFavorites();
    const deleteMutation = useRemoveFavorite();
    const postMutation = useAddFavorite();

    const isFavorite = favorites?.some(fav => fav.id === pokemon.id);
    const isMutating = deleteMutation.isPending || postMutation.isPending; //estado de carga de las mutaciones

    const cambiaFavorito = () => {
        if (isFavorite) {
          deleteMutation.mutate(pokemon.id);
        } else {
          postMutation.mutate(pokemon);
        }
      };
    
    if (isLoadingFavorites) {
        return (
            <div className="justify-items-center border border-gray-400 rounded-md p-5">
            <button disabled>Cargando...</button>
            </div>
        );
    }

    return(
        <div className="justify-items-center border border-red-400 rounded-md p-5" >
            <button onClick={cambiaFavorito} disabled={isMutating}>
                {isMutating ? 
                    (isFavorite ? "Eliminando..." : "Agregando...") 
                    : (isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos")
                }
            </button>
        
      </div>
    );
}
