import { Pokemon } from "../lib/database";

export const favoritesService = {
    getAll: async (): Promise<Pokemon[]> => {
        const res = await fetch("/api/favorites");
        if (!res.ok) throw new Error("Error al obtener pokemons");
        return res.json();
    },
    
    add: async (pokemon: Pokemon): Promise<Pokemon> => {
        const res = await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pokemon),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Error al crear producto");
        }
        return res.json();
    },
    
    remove: async (id: number): Promise<void> => {
        const res = await fetch(`/api/favorites/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Error al eliminar producto");
    },
    
    getById: async (id: number): Promise<Pokemon | undefined> => {
        const res = await fetch(`/api/favorites/${id}`);
        if (res.status === 404) {
            return undefined; // No encontrado
        }
        if (!res.ok) {
            throw new Error("Error al obtener el pokemon");
        }
        
        return res.json();
    },
    
}


