import api from "@/lib/api/api";

export default async function RoomPage({
  params,
}) {
  const response = await api.get(
    `/rooms/${params.id}`
  );

  const room = response.data;

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">
        {room.name}
      </h1>

      <div className="mt-8 space-y-4">
        {room.sessions.map((session) => (
          <div
            key={session.id}
            className="
              border
              rounded-xl
              p-4
            "
          >
            <h2 className="font-bold text-xl">
              {session.title}
            </h2>

            <p>
              {session.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}