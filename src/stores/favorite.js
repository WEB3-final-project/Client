import { create } from "zustand";

import { persist } from "zustand/middleware";

export const useFavoriteStore =
  create(
    persist(
      (set) => ({
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
      }),

      {
        name:
          "event-favorites",
      }
    )
  );