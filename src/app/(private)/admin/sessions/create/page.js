"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api/api";
import { createSession } from "@/lib/api/session";
import { useRouter } from "next/navigation";

export default function CreateSessionPage() {
  const router = useRouter();

  const [rooms, setRooms] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [speakers, setSpeakers] =
    useState([]);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      capacity: "",
      room_id: "",
      event_id: "",
      speaker_ids: [],
    });

  useEffect(() => {
    async function loadData() {
      const [
        roomsRes,
        eventsRes,
        speakersRes,
      ] = await Promise.all([
        api.get("/rooms"),
        api.get("/events"),
        api.get("/speakers"),
      ]);

      setRooms(roomsRes.data);

      setEvents(eventsRes.data);

      setSpeakers(speakersRes.data);
    }

    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await createSession(form);

    router.push(
      "/sessions"
    );
  }

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Session
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
          type="datetime-local"
          value={form.start_time}
          onChange={(e) =>
            setForm({
              ...form,
              start_time:
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
          type="datetime-local"
          value={form.end_time}
          onChange={(e) =>
            setForm({
              ...form,
              end_time:
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
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) =>
            setForm({
              ...form,
              capacity:
                Number(
                  e.target.value
                ),
            })
          }
          className="
            border
            p-3
            rounded
            w-full
          "
        />

        <select
          value={form.room_id}
          onChange={(e) =>
            setForm({
              ...form,
              room_id:
                e.target.value,
            })
          }
          className="
            border
            p-3
            rounded
            w-full
          "
        >
          <option value="">
            Select Room
          </option>

          {rooms.map((room) => (
            <option
              key={room.id}
              value={room.id}
            >
              {room.name}
            </option>
          ))}
        </select>

        <select
          value={form.event_id}
          onChange={(e) =>
            setForm({
              ...form,
              event_id:
                e.target.value,
            })
          }
          className="
            border
            p-3
            rounded
            w-full
          "
        >
          <option value="">
            Select Event
          </option>

          {events.map((event) => (
            <option
              key={event.id}
              value={event.id}
            >
              {event.title}
            </option>
          ))}
        </select>

        <div>
          <p className="font-bold mb-2">
            Speakers
          </p>

          <div className="space-y-2">
            {speakers.map(
              (speaker) => (
                <label
                  key={speaker.id}
                  className="flex gap-2"
                >
                  <input
                    type="checkbox"
                    value={
                      speaker.id
                    }
                    onChange={(e) => {
                      if (
                        e.target.checked
                      ) {
                        setForm({
                          ...form,
                          speaker_ids:
                            [
                              ...form.speaker_ids,
                              speaker.id,
                            ],
                        });
                      } else {
                        setForm({
                          ...form,
                          speaker_ids:
                            form.speaker_ids.filter(
                              (
                                id
                              ) =>
                                id !==
                                speaker.id
                            ),
                        });
                      }
                    }}
                  />

                  {speaker.full_name}
                </label>
              )
            )}
          </div>
        </div>

        <button
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
        >
          Create Session
        </button>
      </form>
    </main>
  );
}