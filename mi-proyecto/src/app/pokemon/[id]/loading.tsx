import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // ¡Importante! Importa los estilos

function PokemonCardSkeleton() {
  return (
    <div className="justify-center p-5 w-1/3 mx-auto pb-50">
      {/* Imagen */}
      <Skeleton height={240} width={240} />

      {/* Número */}
      <Skeleton width="30%" className="mt-2" />
      
      {/* Nombre */}
      <Skeleton height={28} width="60%" className="mt-1" />
    </div>
  );
}

export default PokemonCardSkeleton;


