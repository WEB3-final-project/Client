"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getEventById,
  updateEvent,
} from "@/lib/api/event";

export default function EditEventPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState(null);

  useEffect(() => {
    async function loadEvent() {
      const event =
        await getEventById(
          params.id
        );

      setForm({
        title: event.event.title,
        description:
          event.event.description || "",
        start_date:
          event.event.start_date
            ?.slice(0, 10) || "",

        end_date:
          event.event.end_date
            ?.slice(0, 10) || "",
        location:
          event.event.location || "",
      });
    }

    loadEvent();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await updateEvent(
        params.id,
        form
      );

      router.push(
        "/events"
      );
    } finally {
      setLoading(false);
    }
  }

  if (!form) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Event
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

        <input
          type="date"
          value={form.start_date}
          onChange={(e) =>
            setForm({
              ...form,
              start_date:
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

        <input
          type="date"
          value={form.end_date}
          onChange={(e) =>
            setForm({
              ...form,
              end_date:
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

        <input
          type="text"
          value={form.location}
          onChange={(e) =>
            setForm({
              ...form,
              location:
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
            ? "Updating..."
            : "Update Event"}
        </button>
      </form>
    </main>
  );
}