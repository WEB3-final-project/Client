import api from "@/lib/api/api";

import PlanningGrid from "@/components/public/planning/planningGrid";

export default async function PlanningPage() {
  const response =
    await api.get(
      "/sessions/upcoming"
    );

  const sessions =
    response.data;

  return (
    <main className="relative p-6">
      {sessions != [] ? (
        <PlanningGrid sessions={sessions} />
      ) : (
        <p className="absolute -bottom-[50px] left-[50%] -translate-x-1/2 text-red-400">Aucune session</p>
      )}
    </main>
  );
}
