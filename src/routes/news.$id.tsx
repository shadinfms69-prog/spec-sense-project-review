import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, getGame, fmtDate } from "@/data/esports";
import { Cover, Tag, NotFoundBlock } from "@/components/ui-kit";

export const Route = createFileRoute("/news/$id")({
  loader: ({ params }) => { const a = getArticle(params.id); if (!a) throw notFound(); return a; },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.title} — eSports Explorer` }, { name: "description", content: loaderData.summary }, { property: "og:title", content: loaderData.title }, { property: "og:description", content: loaderData.summary }, { property: "og:type", content: "article" }] : [{ title: "Article not found" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <NotFoundBlock what="Article" />,
  component: Page,
});

function Page() {
  const a = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/news" className="text-sm text-accent hover:underline">← All news</Link>
      <div className="mt-4 flex items-center gap-3"><Tag>{a.category}</Tag><span className="text-sm text-muted-foreground">{fmtDate(a.date)}</span></div>
      <h1 className="mt-3 text-3xl font-bold md:text-4xl">{a.title}</h1>
      <Cover hue={getGame(a.game ?? "")?.hue ?? 280} label={a.category} className="mt-6 h-56 rounded-2xl" />
      <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted-foreground">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
    </article>
  );
}
