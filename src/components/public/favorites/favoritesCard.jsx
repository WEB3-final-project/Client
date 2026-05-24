"use client";

import Link from "next/link";

import { isLive } from "@/utils/live";

import { useFavoriteStore } from "@/stores/favorite";

export default function FavoriteSessionCard({
  session,
}) {
  const removeFavorite =
    useFavoriteStore(
      (state) =>
        state.removeFavorite
    );

  const live = isLive(
    session.start_time,
    session.end_time
  );

  return (
    <div
      className="
        border
        rounded-xl
        p-4
      "
    >
      <div className="flex justify-between">
        <Link
          href={`/public/sessions/${session.id}`}
        >
          <h2 className="text-2xl font-bold">
            {session.title}
          </h2>
        </Link>

        {live && (
          <span
            className="
              bg-red-500
              text-white
              px-2
              py-1
              rounded
              text-sm
            "
          >
            LIVE
          </span>
        )}
      </div>

      <div className="mt-3 text-sm text-gray-500">
        {new Date(
          session.start_time
        ).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )}
        {" - "}
        {new Date(
          session.end_time
        ).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )}
      </div>

      <div className="mt-2">
        Room :
        {" "}
        {session.room.name}
      </div>

      <div className="mt-3">
        Speakers :
      </div>

      <div className="text-sm text-gray-600">
        {session.speakers
          ?.map(
            (s) =>
              s.speaker
                .full_name
          )
          .join(", ")}
      </div>

      <button
        onClick={() =>
          removeFavorite(
            session.id
          )
        }
        className="
          mt-5
          bg-red-500
          text-white
          px-4
          py-2
          rounded
        "
      >
        Remove Favorite
      </button>
    </div>
  );
}