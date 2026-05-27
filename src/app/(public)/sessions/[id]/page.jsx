import {
  getSession,
} from "@/lib/api/session";

import QuestionSection from "@/components/public/questions/questionSection";

export default async function SessionPage({
  params,
}) {
  const resolvedParams = await params; 
  const sessionId = resolvedParams.id;

  const session = await getSession(sessionId);

  if (!session) {
    return <p className="p-6">Session introuvable.</p>;
  }

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          {session.title}
        </h1>

        <p className="mt-4">
          {session.description}
        </p>
      </div>

      <div>
        <strong>Room :</strong>{" "}
        {session.room.name}
      </div>

      <div>
        <strong>Capacity :</strong>{" "}
        {session.capacity}
      </div>

      <div>
        <strong>Speakers :</strong>

        <div className="flex gap-2 mt-2">
          {session.speakers.map((s) => (
            <div key={s.id}>
              {s.speaker.full_name}
            </div>
          ))}
        </div>
      </div>

      {session.is_live && (
        <QuestionSection
          sessionId={session.id}
        />
      )}
    </main>
  );
}