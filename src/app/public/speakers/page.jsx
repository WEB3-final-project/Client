'use client';
import { getAllSpeakers } from "@/lib/api/profile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await getAllSpeakers();
        setSpeakers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des speakers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Chargement des intervenants...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Nos Intervenants</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker) => (
                <div key={speaker.id} className="bg-white rounded-lg shadow-md p-6 text-center">
                    <img 
                      src={speaker.photo_url || "https://via.placeholder.com/150"} 
                      alt={speaker.full_name} 
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" 
                    />
                    <h2 className="text-xl font-semibold mb-4">{speaker.full_name}</h2>
                                        <Link href={`/public/speakers/${speaker.id}`} className="text-blue-500 hover:underline block">
                        Voir le profil
                    </Link>
                </div>
            ))}
        </div>
    </div>
  );
}