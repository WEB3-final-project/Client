"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api/api";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditSessionPage() {
  const params = useParams();

  const router = useRouter();

  const [form, setForm] =
    useState(null);

  useEffect(() => {
    async function loadSession() {
      const response = await api.get(
        `/sessions/${params.id}`
      );

      const session =
        response.data;

      setForm({
        title: session.title,
        description:
          session.description,
        start_time:
          session.start_time.slice(
            0,
            16
          ),
        end_time:
          session.end_time.slice(
            0,
            16
          ),
        capacity:
          session.capacity,
        room_id:
          session.room_id,
        event_id:
          session.event_id,
        speaker_ids:
          session.speakers.map(
            (s) =>
              s.speaker.id
          ),
      });
    }

    loadSession();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await api.put(
      `/sessions/${params.id}`,
      form
    );

    router.push(
      "/private/admin/sessions"
    );
  }

  if (!form) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Session
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value,
            })
          }
          className="
            border
            p-3
            rounded
            w-full
          "
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          className="
            border
            p-3
            rounded
            w-full
          "
        />

        <button
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
        >
          Update Session
        </button>
      </form>
    </main>
  );
}