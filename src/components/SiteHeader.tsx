import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/tournaments", label: "Tournaments" },
  { to: "/matches", label: "Matches" },
  { to: "/teams", label: "Teams & Players" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const linkCls = "rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors";
  const active = { className: "rounded-md px-3 py-2 text-sm text-foreground bg-secondary font-semibold" };
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand"><Gamepad2 className="h-5 w-5" /></span>
          eSports <span className="text-gradient">Explorer</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {nav.map((n) => <Link key={n.to} to={n.to} className={linkCls} activeProps={active} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>)}
        </nav>
        <button className="lg:hidden rounded-md p-2" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t px-4 py-3 flex flex-col" aria-label="Mobile">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={linkCls} activeProps={active} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>© 2026 eSports Explorer. All data shown is sample data for demonstration.</p>
        <Link to="/about" className="hover:text-foreground">About & Contact</Link>
      </div>
    </footer>
  );
}
