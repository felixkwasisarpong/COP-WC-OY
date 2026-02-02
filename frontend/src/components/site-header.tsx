"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ministries", label: "Ministries" },
  { href: "/leadership", label: "Leadership" },
  { href: "/areas", label: "Areas and Districts" },
  { href: "/gallery", label: "Media" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="The Church of Pentecost logo" className="h-10 w-10" />
          <span className="font-display text-lg leading-tight">
            <span className="block text-white">The Church of Pentecost</span>
            <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">
              Oyarifa Worship Center
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-white">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition border-b-2 ${
                  isActive ? "text-wheat border-wheat" : "border-transparent hover:text-wheat"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {user?.role === "admin" && (
            <Link href="/admin" className="text-xs uppercase tracking-[0.3em] text-wheat">
              Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="rounded-full border border-wheat px-5 py-2 text-xs uppercase tracking-[0.3em] text-wheat hover:bg-wheat hover:text-slate-950"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-wheat px-5 py-2 text-xs uppercase tracking-[0.3em] text-wheat hover:bg-wheat hover:text-slate-950"
            >
              Login
            </Link>
          )}
        </nav>
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block text-sm uppercase tracking-[0.2em] text-white">
              {item.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link href="/admin" className="block text-sm uppercase tracking-[0.2em] text-wheat">
              Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="w-full px-5 py-2 rounded-full border border-wheat text-wheat"
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="block w-full px-5 py-2 rounded-full border border-wheat text-wheat">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
