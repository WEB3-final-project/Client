import Link from "next/link";

export default function SessionCard({
  session,
}) {
  return (
    <Link
      href={`/sessions/${session.id}`}
      className="
        border
        rounded-xl
        p-4
        flex
        flex-col
        gap-2
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">
          {session.title}
        </h2>

        {session.is_live && (
          <span
            className="
              bg-red-500
              text-white
              px-2
              py-1
              rounded
              text-sm
            "
          >
            LIVE
          </span>
        )}
      </div>

      <p>{session.description}</p>

      <div className="text-sm text-gray-500">
        Room : {session.room.name}
      </div>

      <div className="text-sm">
        {new Date(
          session.start_time
        ).toLocaleTimeString()}
      </div>
    </Link>
  );
}