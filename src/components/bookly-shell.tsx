"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import { useBookly } from "@/lib/bookly-context";

const navigation = [
  { href: "/", label: "Discover", icon: "home" },
  { href: "/library", label: "My Library", icon: "bookmark" },
  { href: "/create", label: "Create Post", icon: "plus" },
  { href: "/profile", label: "Profile", icon: "user" },
] as const;

export function BooklyShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { savedBookIds } = useBookly();

  return (
    <div className="app-shell">
      <aside className="desktop-sidebar" aria-label="Primary navigation">
        <Link className="brand-lockup" href="/" aria-label="Bookly home">
          <span className="brand-mark"><Icon name="spark" /></span>
          <span className="brand-word">bookly<span>.</span></span>
        </Link>
        <p className="sidebar-kicker">A little more bookish</p>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${active ? " nav-link-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {item.href === "/library" && savedBookIds.length > 0 && (
                  <span className="nav-count">{savedBookIds.length}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-card">
          <span className="sidebar-card-icon"><Icon name="leaf" /></span>
          <p>Good books find you here.</p>
          <Link href="/create">Share what you&apos;re reading <span aria-hidden="true">↗</span></Link>
          <span className="sidebar-card-scribble" aria-hidden="true">✳</span>
        </div>

        <div className="sidebar-profile">
          <span className="avatar avatar-you">Y</span>
          <span><strong>Your reading nook</strong><small>Local prototype</small></span>
          <Icon name="chevron" />
        </div>
        <p className="sidebar-footnote">Made for readers, by readers.<br />A CGT 390 project.</p>
      </aside>

      <main className="main-content" id="main-content">
        {children}
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigation.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-link${active ? " mobile-nav-link-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon name={item.icon} />
              <span>{item.label === "My Library" ? "Library" : item.label === "Create Post" ? "Create" : item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
