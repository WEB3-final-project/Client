"use client";

import { useFavoriteStore } from "@/stores/favorite";

import FavoriteSessionCard from "@/components/public/favorites/favoritesCard";

export default function FavoritesPage() {
  const favorites =
    useFavoriteStore(
      (state) =>
        state.favorites
    );

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-8">
        My Favorites
      </h1>

      {favorites.length === 0 && (
        <p>
          No favorite sessions yet.
        </p>
      )}

      <div className="grid gap-4">
        {favorites.map(
          (session) => (
            <FavoriteSessionCard
              key={session.id}
              session={session}
            />
          )
        )}
      </div>
    </main>
  );
}