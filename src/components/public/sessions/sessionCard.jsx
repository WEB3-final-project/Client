"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import api from "@/lib/api/api";

export default function SessionCard({
  session,
}) {
  const router = useRouter();

  async function handleDelete(
    e
  ) {
    e.preventDefault();

    e.stopPropagation();

    const confirmed = confirm(
      "Delete this session?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/sessions/${session.id}`
      );

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  function handleUpdate(e) {
    e.preventDefault();

    e.stopPropagation();

    router.push(
      `/private/admin/sessions/${session.id}/edit`
    );
  }

  return (
    <Link
      href={`/public/sessions/${session.id}`}
      className="
        border
        rounded-xl
        p-4
        flex
        flex-col
        gap-4
        hover:shadow-md
        transition
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">
          {session.title}
        </h2>

        {session.is_live && (
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

      <p>
        {session.description}
      </p>

      <div className="text-sm text-gray-500">
        Room :
        {" "}
        {session.room.name}
      </div>

      <div className="text-sm">
        {new Date(
          session.start_time
        ).toLocaleTimeString()}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={
            handleUpdate
          }
          className="
            bg-blue-500
            text-white
            px-4
            py-2
            rounded
            text-sm
          "
        >
          Update
        </button>

        <button
          onClick={
            handleDelete
          }
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded
            text-sm
          "
        >
          Delete
        </button>
      </div>
    </Link>
  );
}