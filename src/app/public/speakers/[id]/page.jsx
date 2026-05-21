"use client";
import { getSpeakerProfile } from "@/lib/api/profile";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SpeakerPage() {

  const params = useParams();

  const id = params.id;

  const [speaker, setSpeaker] = useState({
    id: null,
    full_name: "",
    bio: "",
    photo_url: "",
    external_links: {},
    sessions: [],
  });

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!id) return;

    const fetchSpeaker = async () => {

      setError(null);

      try {

        const result = await getSpeakerProfile(id);

        if (!result.success) {

          setError(result.message || "Something went wrong");

        } else {

          setSpeaker(result.speaker || {});
        }

      } catch {

        setError("Cannot connect to server");

      } finally {

        setLoading(false);
      }
    };

    fetchSpeaker();

  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10 max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src={speaker.photo_url || "/default-avatar.png"}
          alt={speaker.full_name || "Speaker"}
          className="w-40 h-40 rounded-full object-cover border-4 border-[var(--color-accent-light)]"
        />
        <h1
          className="text-3xl font-bold text-[var(--color-accent-dark)]"
        >
          {speaker.full_name || "Unknown Speaker"}
        </h1>
        <p className="text-gray-600 max-w-xl">
          {speaker.bio || "No biography available."}
        </p>
      </div>
      <div className="mt-10">
        <h2
          className="text-xl font-semibold mb-4 text-[var(--color-accent)]"
        >
          External Links
        </h2>

        <div className="flex flex-wrap gap-3">
          {Object.entries(speaker.external_links || {}).length > 0 ? (
            Object.entries(speaker.external_links || {}).map(([host, link]) => (
              <a
                key={host}
                href={link}
                target="_blank"
                className="px-4 py-2 rounded-full text-sm border transition hover:scale-105 border-[var(--color-gray)] text-[var(--color-accent-dark)]"
              >
                {host}
              </a>
            ))
          ) : (
            <p className="text-gray-500">No external links</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h2
          className="text-xl font-semibold mb-4 text-[var(--color-accent)]"
        >
          Sessions
        </h2>
        {speaker.sessions?.length > 0 ? (
          <ul className="space-y-4">
            {speaker.sessions.map((session) => (
              <li
                key={session.id}
                className="p-4 rounded-xl border shadow-sm hover:shadow-md transition border-[var(--color-gray)]"
              >
                <h3 className="font-semibold text-lg">
                  {session.title}
                </h3>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No sessions available</p>
        )}
      </div>
    </div>
  );
}