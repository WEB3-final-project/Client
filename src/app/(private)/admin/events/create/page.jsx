"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  createEvent,
} from "@/lib/api/event";

export default function CreateEventPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "",
    });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await createEvent(form);

      router.push(
        "/events"
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
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
          placeholder="Description"
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
          placeholder="Location"
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
            ? "Creating..."
            : "Create Event"}
        </button>
      </form>
    </main>
  );
}