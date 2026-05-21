"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEventById } from "@/lib/api/events";

export default function EventPage() {
    const params = useParams();
    const id = params.id;

    const [event, setEvent] = useState({
        id: null,
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        sessions: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            setError(null);

            try {
                const result = await getEventById(id);

                if (!result.success) {
                    setError(result.message || "Something went wrong");
                } else {
                    setEvent(result.event || {});
                }
            } catch {
                setError("Cannot connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const sortedSessions = [...(event.sessions || [])].sort(
        (a, b) => b.is_live - a.is_live
    );

    return (
        <div className="min-h-screen bg-white text-black px-6 py-10 max-w-5xl mx-auto">
            <div className="text-center flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-[var(--color-accent-dark)]">
                    {event.title || "Untitled Event"}
                </h1>
                <p className="text-gray-600">
                    {event.description || "No description available."}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <i className="fa-solid fa-location-dot"></i>
                    {event.location}
                </p>
                <p className="text-sm text-gray-500">
                    {new Date(event.start_date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}{" "}
                    →{" "}
                    {new Date(event.end_date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </div>
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)]">
                    Sessions
                </h2>
                {sortedSessions.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedSessions.map((session) => (
                            <li
                                key={session.id}
                                className={`p-5 rounded-xl border shadow-sm hover:shadow-md transition ${session.is_live
                                        ? "border-red-500 bg-red-50"
                                        : "border-[var(--color-gray)]"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">
                                        {session.title}
                                    </h3>

                                    {session.is_live && (
                                        <span className="text-xs px-2 py-1 bg-red-500 text-white rounded-full animate-pulse">
                                            LIVE
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    {session.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                    <i className="fa-solid fa-clock"></i>

                                    {new Date(session.start_time).toLocaleTimeString("fr-FR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}

                                    {" - "}

                                    {new Date(session.end_time).toLocaleTimeString("fr-FR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                                <p className="text-xs text-gray-500 flex items-center gap-4 mt-1">
                                    <span className="flex items-center gap-1">
                                        <i className="fa-solid fa-location-dot"></i>
                                        {session.room}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <i className="fa-solid fa-users"></i>
                                        {session.capacity} places
                                    </span>
                                </p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {session.speakers?.map((sp) => (
                                        <div
                                            key={sp.id}
                                            className="flex items-center gap-2 px-3 py-1 border rounded-full"
                                        >
                                            <img
                                                src={sp.photo_url || "/default-avatar.png"}
                                                className="w-6 h-6 rounded-full object-cover"
                                                alt={sp.full_name}
                                            />
                                            <span className="text-sm">{sp.full_name}</span>
                                        </div>
                                    ))}
                                </div>

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