'use client';
import React, { useEffect, useState } from 'react';
import DeleteEventButton from '@/components/private/events/deleteButton';
import { getAllEvents } from '@/lib/api/event'; 
import Cookies from 'js-cookie';
import Loading from '@/components/shared/Loading';

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] =
    useState(null);

  async function loadEvents() {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error("Erreur lors de la récupération du front:", err);
      setError("Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setRole(
      Cookies.get("role")
    );
    loadEvents();
  }, []);

  const handleEventDeleted = (deletedId) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== deletedId));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Erreur :</span> {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Événements à venir</h1>
      
      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Aucun événement de prévu pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <div className="p-6">
                {event.location && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full mb-3">
                    📍 {event.location}
                  </span>
                )}
                
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {event.title}
                </h2>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description || "Aucune description fournie."}
                </p>
              </div>
              
              {role === "admin" && (
                <div className="px-6 pb-4 flex gap-2">
                  <button 
                    className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                    onClick={() => window.location.href = `/private/admin/events/${event.id}/edit`}
                  >
                    Modifier
                  </button>
                  <DeleteEventButton eventId={event.id} onDeleteSuccess={handleEventDeleted} />
                </div>
              )}
              <div>
                <button onClick={() => window.location.href = `/public/events/${event.id}`} className="w-full text-left px-6 py-3 bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700">
                    voir les details
                </button>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
                <div>
                  <span className="block font-medium text-gray-700">Du {formatDate(event.start_date)}</span>
                  <span className="block font-medium text-gray-700">Au {formatDate(event.end_date)}</span>
                </div>
                
                {event.sessions && event.sessions.length > 0 && (
                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold">
                    {event.sessions.length} Session(s)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}