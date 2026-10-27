import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getGame, tournaments, teams, matches } from "@/data/esports";
import { Cover, Tag, TournamentCard, MatchCard, SectionTitle, Avatar, Empty, NotFoundBlock } from "@/components/ui-kit";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => { const g = getGame(params.slug); if (!g) throw notFound(); return g; },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.name} — eSports Explorer` }, { name: "description", content: loaderData.description }, { property: "og:title", content: loaderData.name }, { property: "og:description", content: loaderData.description }] : [{ title: "Game not found" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <NotFoundBlock what="Game" />,
  component: GamePage,
});

function GamePage() {
  const g = Route.useLoaderData();
  const ts = tournaments.filter((t) => t.game === g.slug), tm = teams.filter((t) => t.game === g.slug), ms = matches.filter((m) => m.game === g.slug && m.status === "Completed");
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Cover hue={g.hue} label={g.name} className="h-48 rounded-2xl md:h-64" />
      <div className="mt-6"><Tag>{g.category}</Tag><p className="mt-4 max-w-3xl text-lg text-muted-foreground">{g.overview}</p></div>
      <div className="mt-12 space-y-12">
        <section><SectionTitle title="Tournaments" />{ts.length ? <div className="grid gap-5 md:grid-cols-3">{ts.map((t) => <TournamentCard key={t.id} t={t} />)}</div> : <Empty text="No tournaments yet." />}</section>
        <section><SectionTitle title="Teams" />{tm.length ? <div className="grid gap-3 md:grid-cols-3">{tm.map((t) => <Link key={t.id} to="/teams/$id" params={{ id: t.id }} className="card-surface card-hover flex items-center gap-3 p-3"><Avatar label={t.tag} hue={g.hue} /><span className="font-semibold">{t.name}</span></Link>)}</div> : <Empty text="No teams yet." />}</section>
        <section><SectionTitle title="Recent Results" />{ms.length ? <div className="grid gap-5 md:grid-cols-3">{ms.map((m) => <MatchCard key={m.id} m={m} />)}</div> : <Empty text="No recent results." />}</section>
      </div>
    </div>
  );
}
