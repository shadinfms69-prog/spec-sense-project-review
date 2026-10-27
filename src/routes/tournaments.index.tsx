import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { tournaments, gameName } from "@/data/esports";
import { PageHeader, SearchInput, FilterPills, TournamentCard, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/tournaments/")({
  head: () => ({ meta: [{ title: "Tournaments — eSports Explorer" }, { name: "description", content: "Upcoming, live and completed esports tournaments with prize pools and teams." }, { property: "og:title", content: "Esports Tournaments" }, { property: "og:description", content: "Upcoming, live and completed tournaments." }] }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState(""); const [s, setS] = useState("All");
  const list = tournaments.filter((t) => (s === "All" || t.status === s) && (t.name + gameName(t.game)).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="Tournaments" subtitle="Follow competitions across every game." />
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><SearchInput value={q} onChange={setQ} placeholder="Search tournaments" /><FilterPills options={["All", "Upcoming", "Live", "Completed"]} value={s} onChange={setS} /></div>
      {list.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((t) => <TournamentCard key={t.id} t={t} />)}</div> : <Empty />}
    </div>
  );
}
