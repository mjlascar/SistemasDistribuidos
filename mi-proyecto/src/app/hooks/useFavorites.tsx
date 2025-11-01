"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "../../app/services/favorites.service";

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: favoritesService.getAll,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesService.add,
    onSuccess: () => {
      // invalida la cache para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useFavoriteById(id: number) {
    return useQuery({
      queryKey: ["favorites", id],
      queryFn: () => favoritesService.getById(id),
    });
  }