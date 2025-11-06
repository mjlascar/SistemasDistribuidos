"use client";

import React, { useState } from "react";
import { useAddFavorite, useRemoveFavorite, useFavorites } from "../hooks/useFavorites";
import  FormularioFavorito  from "./FormularioFavorito";
import Modal from "react-modal";
import { FavoriteFormValues } from "../validations/favorites";

// --- estilo del modal ---
const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    
    backgroundColor: '#1a1a1a', 
    color: '#E0E0E0',           
    padding: '2.5rem',         
    borderRadius: '12px',       
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
    
    width: '90%',
    maxWidth: '550px', 
    
    // Si usas Flexbox/Grid para el formulario, puedes agregar
    // display: 'flex',
    // flexDirection: 'column',
    // gap: '1.5rem',
  },
};
// -----------------------------------------------------------------

export default function BotonFav({pokemon}) {
    const { data: favorites, isLoading: isLoadingFavorites } = useFavorites();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const deleteMutation = useRemoveFavorite();
    const postMutation = useAddFavorite();

    const isFavorite = favorites?.some(fav => fav.id === pokemon.id);
    const isMutating = deleteMutation.isPending || postMutation.isPending; //estado de carga de las mutaciones

    if (isLoadingFavorites) {
      return (
        <div className="justify-items-center border border-gray-400 rounded-md p-5">
            <button disabled>Cargando...</button>
            </div>
        );
      }
      
      const cambiaFavorito = () => {
        if (isFavorite) {
          deleteMutation.mutate(pokemon.id);
        } else {
          setIsModalOpen(true)
        }
      };
  
      //funcion para enviar
      const handleFormSubmit = async (formValues: FavoriteFormValues) => {
        try {
          const nuevoFavorito = {
            ...pokemon,
            nombreFav: formValues.nombre, //valida el tipo
            descripcionFav: formValues.descripcion //valida el tipo
          };
          postMutation.mutate(nuevoFavorito);
          setIsModalOpen(false);
  
        } catch (error) {
          alert("Error al agregar favorito");
        }
      };

    return(
      <div className="justify-items-center border border-red-400 rounded-md p-5" >
          <button onClick={cambiaFavorito} disabled={isMutating}>
              {isMutating ? 
                  (isFavorite ? "Eliminando..." : "Agregando...") 
                  : (isFavorite ? "Eliminar de Favoritos" : `Agregar a Favoritos`)
              }
          </button>
          <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)} // permite cerrar con ESC o click fuera
              style={customModalStyles}
              contentLabel="Agregar a Favoritos"
            >
              <FormularioFavorito 
                pokemonName={pokemon.name} 
                onFormSubmit={handleFormSubmit}
                onCancel={() => setIsModalOpen(false)}
                isSubmitting={postMutation.isPending} 
              />
            </Modal>
      </div>
    );
}
