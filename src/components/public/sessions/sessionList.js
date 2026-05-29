"use client";
import { useSessions } from "@/hooks/useSession";
import SessionCard from "./sessionCard";
import { useEffect, useState } from "react";

export default function SessionList() {
  const { sessions: initialSessions, loading } = useSessions();
  const [localSessions, setLocalSessions] = useState([]);


  useEffect(() => {
    if (initialSessions) {
      setLocalSessions(initialSessions);
    }
  }, [initialSessions]);

  const handleSessionDeleted = (deletedId) => {
    setLocalSessions((prev) => prev.filter((s) => s.id !== deletedId));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {localSessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onSessionDeleted={handleSessionDeleted} 
        />
      ))}
    </div>
  );
}