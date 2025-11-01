import { NextResponse } from "next/server";
import { db } from "../../../lib/database";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
        const id = parseInt(params.id);
    
        // Validar el parámetro
        if (isNaN(id) || id<=0) {
        return NextResponse.json(
            { error: "El ID debe ser un número válido" },
            { status: 400 }
        );
        }
    
        const deleted = await db.delete(id);
        
        if (!deleted) {
           return NextResponse.json(
             { error: "Pokemon no encontrado" },
             { status: 404 }
           );
        }

        return NextResponse.json(
        { message: `Pokemon ${id} eliminado` },
        { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
        { error: "Error al eliminar pokemon" },
        { status: 500 }
        );
  }
}