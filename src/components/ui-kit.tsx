import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { fmtDate, gameName, getGame, getTeam, type Match, type Tournament, type Game, type Article } from "@/data/esports";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
      <p className="mt-3 inline-block rounded-md border border-warning/40 px-2 py-0.5 text-xs text-warning">Demo data — not live</p>
    </header>
  );
}

export function SectionTitle({ title, to, }: { title: string; to?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      {to && <Link to={to} className="text-sm text-accent hover:underline">View all →</Link>}
    </div>
  );
}

const statusCls: Record<string, string> = {
  Live: "bg-destructive/15 text-destructive border-destructive/40",
  Upcoming: "bg-accent/15 text-accent border-accent/40",
  Completed: "bg-muted text-muted-foreground border-border",
};
export function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusCls[status] ?? statusCls.Completed}`}>{status === "Live" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />}{status}</span>;
}
export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">{children}</span>;
}

export function Cover({ hue, label, className = "" }: { hue: number; label: string; className?: string }) {
  return (
    <div role="img" aria-label={`${label} cover`} className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `radial-gradient(circle at 30% 20%, oklch(0.55 0.2 ${hue}) 0%, oklch(0.25 0.08 ${hue + 20}) 55%, oklch(0.16 0.03 270) 100%)` }}>
      <span className="font-display text-2xl font-bold tracking-wide text-foreground/90 drop-shadow">{label}</span>
    </div>
  );
}

export function Avatar({ label, hue = 280, size = "h-12 w-12" }: { label: string; hue?: number; size?: string }) {
  return <div aria-hidden className={`${size} flex shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold`} style={{ background: `linear-gradient(135deg, oklch(0.5 0.2 ${hue}), oklch(0.3 0.1 ${hue + 40}))` }}>{label.slice(0, 3).toUpperCase()}</div>;
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="relative block w-full md:max-w-sm">
      <span className="sr-only">{placeholder}</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none" />
    </label>
  );
}

export function FilterPills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} aria-pressed={value === o}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${value === o ? "border-transparent bg-gradient-brand text-primary-foreground font-semibold" : "border-border bg-card text-muted-foreground hover:text-foreground"}`}>{o}</button>
      ))}
    </div>
  );
}

export function Empty({ text = "No results match your filters." }: { text?: string }) {
  return <p className="card-surface p-10 text-center text-muted-foreground">{text}</p>;
}

export function GameCard({ g }: { g: Game }) {
  return (
    <Link to="/games/$slug" params={{ slug: g.slug }} className="card-surface card-hover group block overflow-hidden">
      <Cover hue={g.hue} label={g.name} className="h-36" />
      <div className="p-4">
        <Tag>{g.category}</Tag>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{g.description}</p>
      </div>
    </Link>
  );
}

export function TournamentCard({ t }: { t: Tournament }) {
  return (
    <Link to="/tournaments/$id" params={{ id: t.id }} className="card-surface card-hover block p-5">
      <div className="flex items-center justify-between gap-2"><span className="text-xs text-accent">{gameName(t.game)}</span><StatusBadge status={t.status} /></div>
      <h3 className="mt-2 text-lg font-bold">{t.name}</h3>
      <p className="text-sm text-muted-foreground">{fmtDate(t.start)} – {fmtDate(t.end)} · {t.location}</p>
      <div className="mt-4 flex items-center justify-between text-sm"><span className="font-display font-bold text-gradient text-lg">{t.prize}</span><span className="text-muted-foreground">{t.teams.length} teams</span></div>
    </Link>
  );
}

export function MatchCard({ m }: { m: Match }) {
  const a = getTeam(m.teamA), b = getTeam(m.teamB);
  const hue = getGame(m.game)?.hue ?? 280;
  const done = m.scoreA !== undefined;
  return (
    <div className="card-surface p-5">
      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground"><span>{gameName(m.game)}</span><StatusBadge status={m.status} /></div>
      <div className="flex items-center justify-between gap-3">
        <Link to="/teams/$id" params={{ id: m.teamA }} className="flex min-w-0 items-center gap-2 hover:text-accent"><Avatar label={a?.tag ?? "?"} hue={hue} size="h-10 w-10" /><span className="truncate text-sm font-semibold">{a?.name}</span></Link>
        <span className="font-display text-xl font-bold whitespace-nowrap">{done ? `${m.scoreA} : ${m.scoreB}` : "VS"}</span>
        <Link to="/teams/$id" params={{ id: m.teamB }} className="flex min-w-0 flex-row-reverse items-center gap-2 text-right hover:text-accent"><Avatar label={b?.tag ?? "?"} hue={hue + 60} size="h-10 w-10" /><span className="truncate text-sm font-semibold">{b?.name}</span></Link>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">{new Date(m.date).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>
    </div>
  );
}

export function ArticleCard({ a }: { a: Article }) {
  const hue = a.game ? getGame(a.game)?.hue ?? 280 : 280;
  return (
    <Link to="/news/$id" params={{ id: a.id }} className="card-surface card-hover block overflow-hidden">
      <Cover hue={hue} label={a.category} className="h-32" />
      <div className="p-4">
        <p className="text-xs text-muted-foreground">{fmtDate(a.date)} · Sample article</p>
        <h3 className="mt-1 font-bold leading-snug">{a.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.summary}</p>
      </div>
    </Link>
  );
}

export function NotFoundBlock({ what }: { what: string }) {
  return <div className="mx-auto max-w-md py-24 text-center"><h1 className="text-3xl font-bold">{what} not found</h1><Link to="/" className="mt-4 inline-block text-accent hover:underline">Back home</Link></div>;
}
