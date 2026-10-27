import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTournament, matches, gameName, getTeam, getGame, fmtDate } from "@/data/esports";
import { StatusBadge, MatchCard, SectionTitle, Avatar, Empty, NotFoundBlock } from "@/components/ui-kit";

export const Route = createFileRoute("/tournaments/$id")({
  loader: ({ params }) => { const t = getTournament(params.id); if (!t) throw notFound(); return t; },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.name} — eSports Explorer` }, { name: "description", content: `${loaderData.name}: ${gameName(loaderData.game)} tournament, ${loaderData.prize} prize pool.` }, { property: "og:title", content: loaderData.name }, { property: "og:description", content: `${gameName(loaderData.game)} tournament` }] : [{ title: "Tournament not found" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <NotFoundBlock what="Tournament" />,
  component: Page,
});

function Page() {
  const t = Route.useLoaderData();
  const ms = matches.filter((m) => m.tournament === t.id);
  const hue = getGame(t.game)?.hue ?? 280;
  const stats = [["Game", gameName(t.game)], ["Dates", `${fmtDate(t.start)} – ${fmtDate(t.end)}`], ["Prize pool", t.prize], ["Location", t.location]];
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <StatusBadge status={t.status} />
      <h1 className="mt-3 text-3xl font-bold md:text-5xl">{t.name}</h1>
      <p className="mt-2 text-xs text-warning">Demo data — not live</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([k, v]) => <div key={k} className="card-surface p-4"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 font-display text-lg font-bold">{v}</dd></div>)}</dl>
      <section className="mt-12"><SectionTitle title="Participating Teams" /><div className="grid gap-3 md:grid-cols-3">{t.teams.map((id) => { const tm = getTeam(id); return tm && <Link key={id} to="/teams/$id" params={{ id }} className="card-surface card-hover flex items-center gap-3 p-3"><Avatar label={tm.tag} hue={hue} /><span className="font-semibold">{tm.name}</span></Link>; })}</div></section>
      <section className="mt-12"><SectionTitle title="Schedule & Results" />{ms.length ? <div className="grid gap-5 md:grid-cols-3">{ms.map((m) => <MatchCard key={m.id} m={m} />)}</div> : <Empty text="Schedule to be announced." />}</section>
      <section className="mt-12"><SectionTitle title="Bracket" /><div className="card-surface border-dashed p-10 text-center text-muted-foreground">Bracket will appear here once a live data source is connected.</div></section>
    </div>
  );
}
