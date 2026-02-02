"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ministries", label: "Ministries" },
  { href: "/leadership", label: "Leadership" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Media" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-mist/95 backdrop-blur border-b border-wheat">
      <div className="bg-ember text-white text-xs uppercase tracking-[0.4em]">
        <div className="mx-auto max-w-6xl px-4 py-2">
          We are a Bible-believing, Holy Spirit, people and mission oriented church
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="The Church of Pentecost logo" className="h-10 w-10" />
          <span className="font-display text-lg leading-tight">
            <span className="block">The Church of Pentecost</span>
            <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">
              Oyarifa Worship Center
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.3em]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ember transition">
              {item.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link href="/admin" className="text-xs uppercase tracking-[0.3em] text-ember">
              Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="gradient-border relative px-5 py-2 rounded-full text-sm"
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="gradient-border relative px-5 py-2 rounded-full text-sm">
              Login
            </Link>
          )}
        </nav>
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-wheat bg-mist px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block text-sm uppercase tracking-[0.2em]">
              {item.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link href="/admin" className="block text-sm uppercase tracking-[0.2em] text-ember">
              Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="w-full px-5 py-2 rounded-full border border-ember text-ember"
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="block w-full px-5 py-2 rounded-full border border-ember text-ember">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
