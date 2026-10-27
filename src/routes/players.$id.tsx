import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPlayer, gameName, getGame, teamName } from "@/data/esports";
import { Avatar, SectionTitle, NotFoundBlock } from "@/components/ui-kit";

export const Route = createFileRoute("/players/$id")({
  loader: ({ params }) => { const p = getPlayer(params.id); if (!p) throw notFound(); return p; },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.name} — eSports Explorer` }, { name: "description", content: `${loaderData.name}, ${loaderData.role} for ${teamName(loaderData.team)} in ${gameName(loaderData.game)}.` }, { property: "og:title", content: loaderData.name }, { property: "og:description", content: "Pro player profile" }] : [{ title: "Player not found" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <NotFoundBlock what="Player" />,
  component: Page,
});

function Page() {
  const p = Route.useLoaderData();
  const info = [["Real name", p.realName], ["Game", gameName(p.game)], ["Role", p.role]];
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-5"><Avatar label={p.name} hue={getGame(p.game)?.hue} size="h-20 w-20" /><div><h1 className="text-3xl font-bold md:text-4xl">{p.name}</h1><Link to="/teams/$id" params={{ id: p.team }} className="text-accent hover:underline">{teamName(p.team)}</Link></div></div>
      <p className="mt-3 text-xs text-warning">Sample profile</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">{info.map(([k, v]) => <div key={k} className="card-surface p-4"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>)}</dl>
      <section className="mt-10"><SectionTitle title="Achievements" /><ul className="space-y-2">{p.achievements.map((a) => <li key={a} className="card-surface p-3">🏆 {a}</li>)}</ul></section>
    </div>
  );
}
