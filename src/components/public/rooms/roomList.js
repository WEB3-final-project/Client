'use client';
import React, { useEffect, useState } from 'react';
import DeleteRoomButton from '@/components/private/rooms/deleteButton';
import { getRooms } from '@/lib/api/room';
import Cookies from 'js-cookie';

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] =
    useState(null);

  async function loadRooms() {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des salles:", err);
      setError("Impossible de charger les salles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setRole(
      Cookies.get("role")
    );
    loadRooms();
  }, []);

  const handleRoomDeleted = (deletedId) => {
    setRooms((prevRooms) => prevRooms.filter(room => room.id !== deletedId));
  };

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Erreur :</span> {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Salles à venir</h1>

      {rooms.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Aucune salle de prévue pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                {room.name}
              </h2>
              
              {role === "admin" && (
                <div className="px-6 pb-4 flex gap-2">
                  <button 
                    className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                    onClick={() => window.location.href = `/admin/rooms/${room.id}/edit`}
                  >
                    Modifier
                  </button>
                  <DeleteRoomButton roomId={room.id} onDeleteSuccess={handleRoomDeleted} />
                </div>
              )}
              <div>
                <button onClick={() => window.location.href = `/rooms/${room.id}`} className="w-full text-left px-6 py-3 bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700">
                    voir les details
                </button>
              </div>
              </div>
          ))}
        </div>
      )}
    </div>
  );
}