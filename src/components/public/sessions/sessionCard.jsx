"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteSessionButton from "@/components/private/sessions/deleteButton";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function SessionCard({ session, onSessionDeleted }) {
  const router = useRouter();
  const [role, setRole] =
      useState(null);

  function handleUpdate(e) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/private/admin/sessions/${session.id}/edit`);
  }
  useEffect(() => {
      setRole(
        Cookies.get("role")
      );
    }, []);

  return (
    <Link
      href={`/public/sessions/${session.id}`}
      className="border rounded-xl p-4 flex flex-col gap-4 hover:shadow-md transition"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">{session.title}</h2>
        {session.is_live && (
          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">LIVE</span>
        )}
      </div>

      <p>{session.description}</p>

      <div className="text-sm text-gray-500">
        Room : {session.room?.name || "Non assignée"}
      </div>

      <div className="text-sm">
        {new Date(session.start_time).toLocaleTimeString()}
      </div>

      {role === "admin" && (
        <div 
          className="flex gap-3 pt-2"
          onClick={(e) => e.stopPropagation()} 
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
          >
            Update
          </button>
          
          <DeleteSessionButton
            sessionId={session.id}
            onDeleteSuccess={onSessionDeleted} 
          />
        </div>
      )}
    </Link>
  );
}