import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTeam, players, gameName, getGame } from "@/data/esports";
import { Avatar, SectionTitle, Empty, NotFoundBlock, Tag } from "@/components/ui-kit";

export const Route = createFileRoute("/teams/$id")({
  loader: ({ params }) => { const t = getTeam(params.id); if (!t) throw notFound(); return t; },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.name} — eSports Explorer` }, { name: "description", content: `${loaderData.name} ${gameName(loaderData.game)} roster and achievements.` }, { property: "og:title", content: loaderData.name }, { property: "og:description", content: `${gameName(loaderData.game)} team profile` }] : [{ title: "Team not found" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <NotFoundBlock what="Team" />,
  component: Page,
});

function Page() {
  const t = Route.useLoaderData();
  const roster = players.filter((p) => p.team === t.id);
  const hue = getGame(t.game)?.hue;
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-center gap-5"><Avatar label={t.tag} hue={hue} size="h-20 w-20" /><div><h1 className="text-3xl font-bold md:text-4xl">{t.name}</h1><div className="mt-2 flex gap-2"><Tag>{gameName(t.game)}</Tag><Tag>{t.region}</Tag></div></div></div>
      <p className="mt-3 text-xs text-warning">Sample profile</p>
      <section className="mt-10"><SectionTitle title="Roster" />{roster.length ? <div className="grid gap-3 sm:grid-cols-2">{roster.map((p) => <Link key={p.id} to="/players/$id" params={{ id: p.id }} className="card-surface card-hover flex items-center gap-3 p-3"><Avatar label={p.name} hue={hue} /><div><p className="font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.role}</p></div></Link>)}</div> : <Empty text="Roster not available yet." />}</section>
      <section className="mt-10"><SectionTitle title="Achievements" /><ul className="space-y-2">{t.achievements.map((a) => <li key={a} className="card-surface p-3">🏆 {a}</li>)}</ul></section>
    </div>
  );
}
