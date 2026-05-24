import api from "@/lib/api/api";

export default async function RoomPage({
  params
}) {

  const { id } = await params;
  const response = await api.get(
    `/rooms/${id}`
  );
  const room = response.data;

  if (!room) {
    return <p>Room not found</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">
        {room.name}
      </h1>

      <div className="mt-8 space-y-4">
        <h2>Sessions: </h2>
        {room.sessions.map((session) => (
          <div
            key={session.id}
            className="
              border
              rounded-xl
              p-4
            "
          >
            <h3 className="font-bold text-xl">
              {session.title}
            </h3>

            <p>
              {session.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}