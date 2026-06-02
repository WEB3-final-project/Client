"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { isLive } from "@/utils/live";
import FavoriteButton from "./favoriteButton";

export default function PlanningGrid({ sessions: initialSessions }) {
  const [sessions] = useState(initialSessions);

  const sortedSessions = useMemo(() => {
    return [...sessions].sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );
  }, [sessions]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString([], {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Event Planning
      </h1>

      <div className="space-y-5">
        {sortedSessions.map((session) => {
          const live = isLive(session.start_time, session.end_time);

          return (
            <div
              key={session.id}
              className={`
                group
                rounded-2xl
                border
                p-6
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-0.5
                transition-all
                duration-200

                ${live
                  ? "border-red-400 bg-red-50/40 shadow-red-100"
                  : "border-gray-100 bg-white"
                }
              `}
            >
              <div className="flex justify-between items-start gap-4">
                <Link href={`/sessions/${session.id}`}>
                  <h2
                    className={`
                      text-xl font-semibold transition
                      ${live
                        ? "text-red-600"
                        : "text-gray-900 group-hover:text-[var(--color-accent)]"
                      }
                    `}
                  >
                    {session.title}
                  </h2>
                </Link>

                {live && (
                  <span className="
                    bg-red-600
                    text-white
                    text-xs font-bold
                    px-3 py-1
                    rounded-full
                    shadow-md
                    animate-pulse
                    flex items-center gap-2
                  ">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                    LIVE
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-800">
                  {formatDate(session.start_time)}
                </span>

                <span className="text-gray-400">•</span>

                <span>
                  {formatTime(session.start_time)} - {formatTime(session.end_time)}
                </span>

                <span className="text-gray-400">•</span>

                <span className="
                  px-2 py-0.5
                  rounded-md
                  bg-[var(--color-accent-light)]
                  text-white
                  text-xs
                  font-medium
                ">
                  {session.room.name}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                {session.speakers?.map((s) => s.speaker.full_name).join(", ")}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <FavoriteButton session={session} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}