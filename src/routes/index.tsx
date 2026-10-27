import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { games, tournaments, matches, teams, players, articles, gameName, getGame } from "@/data/esports";
import { GameCard, TournamentCard, MatchCard, ArticleCard, SectionTitle, Avatar } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "eSports Explorer — Games, Tournaments, Teams & News" },
    { name: "description", content: "Discover esports games, tournaments, teams, pro players, match results and news in one place." },
    { property: "og:title", content: "eSports Explorer" },
    { property: "og:description", content: "Your hub for esports games, tournaments, teams and results." },
  ] }),
  component: Index,
});

function Index() {
  const quick = [["/games", "Games"], ["/tournaments", "Tournaments"], ["/matches", "Matches"], ["/teams", "Teams & Players"], ["/news", "News"]] as const;
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Esports arena stage lit in purple and cyan" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Explore the World of <span className="text-gradient">Esports</span></h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">Games, tournaments, teams, pro players, results and news — all in one place.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/games" className="rounded-lg bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90">Explore Games</Link>
            <Link to="/tournaments" className="rounded-lg border bg-card/60 px-6 py-3 font-semibold hover:border-accent">View Tournaments</Link>
          </div>
          <nav aria-label="Quick links" className="mt-10 flex flex-wrap gap-2">
            {quick.map(([to, l]) => <Link key={to} to={to} className="rounded-full border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground">{l}</Link>)}
          </nav>
        </div>
      </section>
      <div className="mx-auto max-w-7xl space-y-16 px-4 pt-6">
        <p className="text-xs text-warning">All content below is sample demonstration data.</p>
        <section><SectionTitle title="Featured Games" to="/games" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{games.slice(0, 4).map((g) => <GameCard key={g.slug} g={g} />)}</div></section>
        <section><SectionTitle title="Upcoming & Live Tournaments" to="/tournaments" /><div className="grid gap-5 md:grid-cols-3">{tournaments.filter((t) => t.status !== "Completed").slice(0, 3).map((t) => <TournamentCard key={t.id} t={t} />)}</div></section>
        <section><SectionTitle title="Recent Results" to="/matches" /><div className="grid gap-5 md:grid-cols-3">{matches.filter((m) => m.status === "Completed").slice(0, 3).map((m) => <MatchCard key={m.id} m={m} />)}</div></section>
        <section className="grid gap-10 lg:grid-cols-2">
          <div><SectionTitle title="Popular Teams" to="/teams" /><ul className="space-y-3">{teams.slice(0, 4).map((t) => <li key={t.id}><Link to="/teams/$id" params={{ id: t.id }} className="card-surface card-hover flex items-center gap-4 p-3"><Avatar label={t.tag} hue={getGame(t.game)?.hue} /><div><p className="font-semibold">{t.name}</p><p className="text-xs text-muted-foreground">{gameName(t.game)} · {t.region}</p></div></Link></li>)}</ul></div>
          <div><SectionTitle title="Pro Players" to="/teams" /><ul className="space-y-3">{players.slice(0, 4).map((p) => <li key={p.id}><Link to="/players/$id" params={{ id: p.id }} className="card-surface card-hover flex items-center gap-4 p-3"><Avatar label={p.name} hue={getGame(p.game)?.hue} /><div><p className="font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.role} · {gameName(p.game)}</p></div></Link></li>)}</ul></div>
        </section>
        <section><SectionTitle title="Latest News" to="/news" /><div className="grid gap-5 md:grid-cols-3">{articles.slice(0, 3).map((a) => <ArticleCard key={a.id} a={a} />)}</div></section>
      </div>
    </>
  );
}
