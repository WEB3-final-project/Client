"use client";
import { deleteRoom } from "@/lib/api/room";

export default function DeleteRoomButton({ roomId, onDeleteSuccess }) {
  async function handleDelete() {
    const confirmed = confirm("Voulez-vous vraiment supprimer cette salle ?");
    if (!confirmed) return;

    try {
      await deleteRoom(roomId);

      if (onDeleteSuccess) {
        onDeleteSuccess(roomId);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Impossible de supprimer la salle.");
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