"use client";

import { useSessions } from "@/hooks/useSession";

import SessionCard from "./sessionCard";

export default function SessionList() {
  const { sessions, loading } =
    useSessions();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-4
      "
    >
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
        />
      ))}
    </div>
  );
}