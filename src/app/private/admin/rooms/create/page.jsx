"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api/api";

export default function CreateRoomPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/rooms", {
        name,
      });

      router.push("/public/rooms");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Room
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Room name"
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
          {loading
            ? "Creating..."
            : "Create"}
        </button>
      </form>
    </main>
  );
}