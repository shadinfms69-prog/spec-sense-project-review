import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Gamepad2, Users, Newspaper, Mail } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — eSports Explorer" }, { name: "description", content: "What eSports Explorer is, its features, and how to contact the team." }, { property: "og:title", content: "About eSports Explorer" }, { property: "og:description", content: "Purpose, features and contact." }] }),
  component: Page,
});

const features = [
  { icon: Gamepad2, t: "Game segments", d: "Dedicated sections for eFootball, PUBG Mobile, Free Fire and more." },
  { icon: Trophy, t: "Tournaments & results", d: "Schedules, prize pools, match results and brackets." },
  { icon: Users, t: "Teams & players", d: "Searchable profiles with rosters, roles and achievements." },
  { icon: Newspaper, t: "News", d: "Recaps, guides and community stories." },
];

function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-5xl">About <span className="text-gradient">eSports Explorer</span></h1>
      <p className="mt-5 max-w-3xl text-lg text-muted-foreground">eSports Explorer is a centralized platform for discovering competitive gaming — games, tournaments, teams, players, schedules, results and news in one place. This version uses sample data; a real esports data source can be connected later.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">{features.map(({ icon: I, t, d }) => <div key={t} className="card-surface p-5"><I className="h-6 w-6 text-accent" /><h2 className="mt-3 text-lg font-bold">{t}</h2><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>)}</div>
      <section className="card-surface mt-12 p-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold"><Mail className="h-5 w-5 text-accent" />Contact</h2>
        <p className="mt-2 text-muted-foreground">Questions or feedback? Email us at <a className="text-accent hover:underline" href="mailto:contact@esportsexplorer.example">contact@esportsexplorer.example</a>.</p>
      </section>
    </div>
  );
}
