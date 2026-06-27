import PlanningRoomsGrid from "@/components/public/planning/planningRoomsGrid";
import api from "@/lib/api/api";

export default async function PlanningRoomsPage() {
  const response =
    await api.get(
      "/sessions"
    );
  const sessions =
    response.data;

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-8">
        Event Planning
      </h1>

      <PlanningRoomsGrid
        sessions={sessions}
      />
    </main>
  );
}
