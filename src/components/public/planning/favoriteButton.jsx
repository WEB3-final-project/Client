"use client";

import { useFavoriteStore } from "@/stores/favorite";

export default function FavoriteButton({
  session,
}) {
  const favorites =
    useFavoriteStore(
      (state) =>
        state.favorites
    );

  const addFavorite =
    useFavoriteStore(
      (state) =>
        state.addFavorite
    );

  const removeFavorite =
    useFavoriteStore(
      (state) =>
        state.removeFavorite
    );

  const exists =
    favorites.find(
      (s) =>
        s.id === session.id
    );

  function toggle() {
    if (exists) {
      removeFavorite(
        session.id
      );
    } else {
      addFavorite(
        session
      );
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();

        toggle();
      }}
      className="
        border
        rounded
        px-3
        py-2
        text-sm
      "
    >
      {exists
        ? "Remove Favorite"
        : "Add Favorite"}
    </button>
  );
}