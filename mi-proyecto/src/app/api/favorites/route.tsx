import { NextResponse } from "next/server";
import { db } from "../../lib/database";

export async function GET() {
    try {
      const pokemons = await db.getAll();
      return NextResponse.json(pokemons, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error al obtener pokemons fav" },
        { status: 500 }
      );
    }
  }

export async function POST(request: Request) {                      
    try {
      const body = await request.json();
      
      // Validación simple
      if (!body.id || !body.name) {                                  
        return NextResponse.json(
          { error: "Falta campo obligatorio: id o name" },
          { status: 400 }
        );
      }
  
      if ( typeof body.id !== "number" || body.id<=0 || typeof body.name !== "string" ) {
        return NextResponse.json(
          { error: "Campo o tipo de campo incorrecto" },
          { status: 400 }
        );
      }

      if (body.nombreFav && typeof body.nombreFav !== 'string') {
        return NextResponse.json({ error: "Tipo de campo incorrecto para nombreFav" }, { status: 400 });
      }

      if (body.descripcionFav && typeof body.descripcionFav !== 'string') {
        return NextResponse.json({ error: "Tipo de campo incorrecto para descripcionFav" }, { status: 400 });
      }
  
      // Si todo esta bien, procesamos
      const newPokemon = await db.create({
        id: body.id,
        name: body.name,
        sprites: {
          front_default: body.sprites.front_default || "" // Asumiendo que el body trae el sprite
        },
        nombreFav: body.nombreFav,
        descripcionFav: body.descripcionFav,
      });
      
      return NextResponse.json(newPokemon, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error al procesar la solicitud" },
        { status: 500 }
      );
    }
}