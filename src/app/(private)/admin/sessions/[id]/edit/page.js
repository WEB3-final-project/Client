"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api/api";

import { updateSession } from "@/lib/api/session";
import {
  useParams,
  useRouter,
} from "next/navigation";


export default function EditSessionPage() {

  const params = useParams();

  const router = useRouter();

  const [form, setForm] =
    useState(null);

  const [rooms, setRooms] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [speakers, setSpeakers] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      const [
        sessionResponse,
        roomsResponse,
        eventsResponse,
        speakersResponse,
      ] = await Promise.all([
        api.get(
          `/sessions/${params.id}`
        ),
        api.get("/rooms"),
        api.get("/events"),
        api.get("/speakers"),
      ]);

      const session =
        sessionResponse.data;

      setRooms(
        roomsResponse.data
      );

      setEvents(
        eventsResponse.data
      );

      setSpeakers(
        speakersResponse.data
      );

      setForm({
        title: session.title,
        description:
          session.description || "",
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
          session.capacity || "",
        room_id:
          session.room_id || "",
        event_id:
          session.event_id || "",
        speaker_ids:
          session.speakers.map(
            (s) =>
              s.speaker.id
          ),
      });
    }

    loadData();

  }, [params.id]);

  function handleChange(e) {

    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSpeakerChange(
    speakerId
  ) {

    setForm((prev) => {

      const exists =
        prev.speaker_ids.includes(
          speakerId
        );

      return {
        ...prev,

        speaker_ids: exists
          ? prev.speaker_ids.filter(
              (id) =>
                id !== speakerId
            )
          : [
              ...prev.speaker_ids,
              speakerId,
            ],
      };
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    await updateSession(params.id,form);

    router.push(
      "/sessions"
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
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="
            border
            p-3
            rounded
            w-full
          "
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="
            border
            p-3
            rounded
            w-full
          "
        />

        <input
          type="datetime-local"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          className="
            border
            p-3
            rounded
            w-full
          "
        />

        <input
          type="datetime-local"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          className="
            border
            p-3
            rounded
            w-full
          "
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          className="
            border
            p-3
            rounded
            w-full
          "
        />

        <select
          name="room_id"
          value={form.room_id}
          onChange={handleChange}
          className="
            border
            p-3
            rounded
            w-full
          "
        >
          <option value="">
            Select room
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
          name="event_id"
          value={form.event_id}
          onChange={handleChange}
          className="
            border
            p-3
            rounded
            w-full
          "
        >
          <option value="">
            Select event
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
          <p className="font-semibold mb-2">
            Speakers
          </p>

          <div className="space-y-2">
            {speakers.map(
              (speaker) => (
                <label
                  key={speaker.id}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <input
                    type="checkbox"
                    checked={form.speaker_ids.includes(
                      speaker.id
                    )}
                    onChange={() =>
                      handleSpeakerChange(
                        speaker.id
                      )
                    }
                  />

                  {
                    speaker.full_name
                  }
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
          Update Session
        </button>

      </form>
    </main>
  );
}