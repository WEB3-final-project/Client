"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getRoomById, updateRoom } from "@/lib/api/room";


export default function EditRoomPage() {
  const params = useParams();

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    async function loadRoom() {
      const response = await getRoomById(params.id);

      setName(response.data.name);
    }

    loadRoom();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await updateRoom(params.id, {
        name,
      });

      router.push("/planning");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Room
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="
            border
            rounded
            p-3
            w-full
          "
        />

        <button
          disabled={loading}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
        >
          Update
        </button>
      </form>
    </main>
  );
}