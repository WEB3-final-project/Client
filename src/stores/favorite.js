import { create } from "zustand";

export const useFavoriteStore =
  create((set) => ({
    favorites: [],

    addFavorite: (
      session
    ) =>
      set((state) => ({
        favorites: [
          ...state.favorites,
          session,
        ],
      })),

    removeFavorite: (
      id
    ) =>
      set((state) => ({
        favorites:
          state.favorites.filter(
            (s) =>
              s.id !== id
          ),
      })),
  }));