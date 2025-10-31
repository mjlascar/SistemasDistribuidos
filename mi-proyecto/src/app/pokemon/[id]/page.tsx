import axios from 'axios';
import React from "react";

type Props = {
  params: { id: number };
};

export default async function PokemonData({ params }: Props) {
  const { id } = params;
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = res.data;

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