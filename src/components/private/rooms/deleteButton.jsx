"use client";

import api from "@/lib/api/api";

import { useRouter } from "next/navigation";

export default function DeleteRoomButton({
  roomId,
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(
      "Delete this room?"
    );

    if (!confirmed) return;

    await api.delete(
      `/rooms/${roomId}`
    );

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="
        bg-red-500
        text-white
        px-3
        py-2
        rounded
      "
    >
      Delete
    </button>
  );
}