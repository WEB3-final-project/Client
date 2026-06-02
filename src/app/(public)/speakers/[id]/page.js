"use client";
import { getSpeakerProfile } from "@/lib/api/profile";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/shared/Loading";

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
    return <Loading />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="min-h-screen relative bg-gray-50 text-black px-6 py-10">

      <Link
        href="/speakers"
        className="absolute top-1 right-8 md:right-auto md:left-2 px-4 py-2 flex justify-center gap-2 items-center text-lg font-sm"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>Back</span>
      </Link>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-start gap-4">
            <img
              src={speaker.photo_url || "/default-avatar.png"}
              alt={speaker.full_name || "Speaker"}
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
            />

            <h1 className="text-2xl font-bold">
              {speaker.full_name || "Unknown Speaker"}
            </h1>

            <p className="text-gray-600 text-sm leading-relaxed">
              {speaker.bio || "No biography available."}
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-10">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              External Links
            </h2>

            <div className="flex flex-wrap gap-2">
              {Object.entries(speaker.external_links || {}).length > 0 ? (
                Object.entries(speaker.external_links || {}).map(([host, link]) => (
                  <a
                    key={host}
                    href={link}
                    target="_blank"
                    className="px-3 py-1 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-100"
                  >
                    {host}
                  </a>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No external links</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Sessions
            </h2>

            {speaker.sessions?.length > 0 ? (
              <div className="space-y-2">
                {speaker.sessions.map((session) => (
                  <Link
                    key={session.id}
                    href={`/sessions/${session.id}`}
                    className="block p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition"
                  >
                    <h3 className="font-medium">
                      {session.title}
                    </h3>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No sessions available</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}