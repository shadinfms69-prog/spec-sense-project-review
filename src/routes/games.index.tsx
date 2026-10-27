import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { games } from "@/data/esports";
import { PageHeader, SearchInput, FilterPills, GameCard, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/games/")({
  head: () => ({ meta: [{ title: "Games — eSports Explorer" }, { name: "description", content: "Browse esports titles like eFootball, PUBG Mobile, Free Fire, Valorant and more." }, { property: "og:title", content: "Esports Games — eSports Explorer" }, { property: "og:description", content: "Browse competitive esports games." }] }),
  component: Games,
});

function Games() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(games.map((g) => g.category))];
  const list = games.filter((g) => (cat === "All" || g.category === cat) && g.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="Games" subtitle="Explore competitive titles and their esports scenes." />
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><SearchInput value={q} onChange={setQ} placeholder="Search games" /><FilterPills options={cats} value={cat} onChange={setCat} /></div>
      {list.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((g) => <GameCard key={g.slug} g={g} />)}</div> : <Empty />}
    </div>
  );
}
