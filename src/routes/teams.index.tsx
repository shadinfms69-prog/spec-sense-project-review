import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { teams, players, gameName, getGame, teamName } from "@/data/esports";
import { PageHeader, SearchInput, FilterPills, Avatar, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/teams/")({
  head: () => ({ meta: [{ title: "Teams & Players — eSports Explorer" }, { name: "description", content: "Searchable directory of esports teams and professional players." }, { property: "og:title", content: "Teams & Players" }, { property: "og:description", content: "Esports team and player directory." }] }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState("Teams"); const [q, setQ] = useState("");
  const ql = q.toLowerCase();
  const ts = teams.filter((t) => (t.name + gameName(t.game) + t.region).toLowerCase().includes(ql));
  const ps = players.filter((p) => (p.name + p.realName + gameName(p.game) + p.role).toLowerCase().includes(ql));
  const items = tab === "Teams"
    ? ts.map((t) => <Link key={t.id} to="/teams/$id" params={{ id: t.id }} className="card-surface card-hover flex items-center gap-4 p-4"><Avatar label={t.tag} hue={getGame(t.game)?.hue} /><div><p className="font-semibold">{t.name}</p><p className="text-xs text-muted-foreground">{gameName(t.game)} · {t.region}</p></div></Link>)
    : ps.map((p) => <Link key={p.id} to="/players/$id" params={{ id: p.id }} className="card-surface card-hover flex items-center gap-4 p-4"><Avatar label={p.name} hue={getGame(p.game)?.hue} /><div><p className="font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.role} · {teamName(p.team)} · {gameName(p.game)}</p></div></Link>);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="Teams & Players" subtitle="Find teams, rosters and professional players." />
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><FilterPills options={["Teams", "Players"]} value={tab} onChange={setTab} /><SearchInput value={q} onChange={setQ} placeholder={`Search ${tab.toLowerCase()}`} /></div>
      {items.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items}</div> : <Empty />}
    </div>
  );
}
