import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { articles } from "@/data/esports";
import { PageHeader, SearchInput, FilterPills, ArticleCard, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/news/")({
  head: () => ({ meta: [{ title: "News — eSports Explorer" }, { name: "description", content: "Esports news, guides and tournament recaps." }, { property: "og:title", content: "Esports News" }, { property: "og:description", content: "Esports news, guides and recaps." }] }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState(""); const [c, setC] = useState("All");
  const cats = ["All", ...new Set(articles.map((a) => a.category))];
  const list = articles.filter((a) => (c === "All" || a.category === c) && (a.title + a.summary).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="News" subtitle="Sample articles for demonstration — not real breaking news." />
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><SearchInput value={q} onChange={setQ} placeholder="Search news" /><FilterPills options={cats} value={c} onChange={setC} /></div>
      {list.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.id} a={a} />)}</div> : <Empty />}
    </div>
  );
}
