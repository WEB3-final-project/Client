"use client";
import { useState } from "react";
import { deleteSession } from "@/lib/api/session";
export default function DeleteSessionButton({ sessionId, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation(); 

    const confirmed = confirm("Voulez-vous vraiment supprimer cette session ?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteSession(sessionId);

      if (onDeleteSuccess) {
        onDeleteSuccess(sessionId);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Impossible de supprimer la session.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors disabled:bg-red-300"
    >
      {isDeleting ? "Suppression..." : "Supprimer"}
    </button>
  );
}