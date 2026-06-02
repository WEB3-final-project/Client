'use client';
import Loading from "@/components/shared/Loading";
import { getAllSpeakers } from "@/lib/api/profile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await getAllSpeakers();
        setSpeakers(data);
        setError(null);
      } catch (error) {
        setError("Cannot connect to server.");
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Nos Intervenants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
            <img
              src={speaker.photo_url || "/default-avatar.png"}
              alt={speaker.full_name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-gray-100"
            />
            <h2 className="text-xl font-semibold mb-2">{speaker.full_name}</h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {speaker.bio}
            </p>
            <Link href={`/speakers/${speaker.id}`} className="text-blue-500 hover:underline block">
              Voir le profil
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}