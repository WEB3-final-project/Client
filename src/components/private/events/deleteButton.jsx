"use client";
import api from "@/lib/api/api";

export default function DeleteEventButton({ eventId, onDeleteSuccess }) {
  async function handleDelete() {
    const confirmed = confirm("Voulez-vous vraiment supprimer cet événement ?");
    if (!confirmed) return;

    try {
      await api.delete(`/events/${eventId}`);
      
      if (onDeleteSuccess) {
        onDeleteSuccess(eventId);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Impossible de supprimer l'événement.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
    >
      Supprimer
    </button>
  );
}