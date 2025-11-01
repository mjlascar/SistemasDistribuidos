"use client";

import React from "react";
import { useState } from "react";
import TarjetaPokemon from "../components/TarjetaPokemon";


export default function ListaPokemon() {
    const [limit, setLimit] = useState(20);
  const pokemonIds = Array.from({ length: limit }, (_, i) => i + 1);

  const cargaMas = () => {
    setLimit((actual) => actual + 20);
  };


    return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 p-15">
                {pokemonIds.map( (id) => (
                <TarjetaPokemon key={id} id={id}/>
                ))}
            </div>
            <div className="flex gap-5 items-center justify-center pb-10">
                <button className="items-center border border-gray-400 rounded-md p-3" onClick={cargaMas}>Cargar Mas</button>
        </div>
      </div>
    )
  }

  