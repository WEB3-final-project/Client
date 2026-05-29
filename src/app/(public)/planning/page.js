import api from "@/lib/api/api";

import PlanningGrid from "@/components/public/planning/planningGrid";

export default async function PlanningPage() {
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

      <PlanningGrid
        sessions={sessions}
      />
    </main>
  );
}
