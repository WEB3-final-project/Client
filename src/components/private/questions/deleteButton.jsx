"use client";
import { deleteQuestion } from "@/lib/api/question";

export default function DeleteQuestionButton({ questionId, onDeleteSuccess }) {
  async function handleDelete() {
    const confirmed = confirm("Voulez-vous vraiment supprimer cet événement ?");
    if (!confirmed) return;

    try {
      await deleteQuestion(questionId);
      
      if (onDeleteSuccess) {
        onDeleteSuccess(questionId);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Impossible de supprimer la question.");
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