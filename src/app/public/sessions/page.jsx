import SessionList from "@/components/public/sessions/sessionList";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6">
        Event Platform
      </h1>

      <SessionList />
    </main>
  );
}