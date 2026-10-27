import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { matches, games } from "@/data/esports";
import { PageHeader, FilterPills, MatchCard, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/matches")({
  head: () => ({ meta: [{ title: "Matches & Results — eSports Explorer" }, { name: "description", content: "Upcoming esports matches and completed results across all games." }, { property: "og:title", content: "Matches & Results" }, { property: "og:description", content: "Esports schedules and results." }] }),
  component: Page,
});

function Page() {
  const [s, setS] = useState("All"); const [g, setG] = useState("All games");
  const list = matches.filter((m) => (s === "All" || m.status === s) && (g === "All games" || games.find((x) => x.slug === m.game)?.name === g)).sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="Matches & Results" subtitle="Sample results shown until a real esports data feed is connected." />
      <div className="mb-8 space-y-3"><FilterPills options={["All", "Upcoming", "Live", "Completed"]} value={s} onChange={setS} /><FilterPills options={["All games", ...games.map((x) => x.name)]} value={g} onChange={setG} /></div>
      {list.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((m) => <MatchCard key={m.id} m={m} />)}</div> : <Empty />}
    </div>
  );
}
