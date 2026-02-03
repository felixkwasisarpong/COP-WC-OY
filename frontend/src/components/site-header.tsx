"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, Search, X, Youtube } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/services/site-content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ministries", label: "Ministries" },
  { href: "/leadership", label: "Leadership" },
  { href: "/gallery", label: "Media" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { data: siteContent } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent
  });
  const isHome = pathname === "/";
  const headerStyles = isHome
    ? "bg-slate-950/95 border-b border-slate-800"
    : "bg-white border-b border-slate-200";
  const navText = isHome ? "text-white" : "text-ink";
  const navActive = isHome ? "text-wheat border-wheat" : "text-wheat border-wheat";
  const navInactive = isHome ? "border-transparent hover:text-wheat" : "border-transparent hover:text-ember";
  const authButton = isHome
    ? "rounded-full border border-wheat px-5 py-2 text-xs uppercase tracking-[0.3em] text-wheat hover:bg-wheat hover:text-slate-950"
    : "rounded-none border border-slate-200 px-4 py-2 text-xs uppercase tracking-[0.3em] text-ink hover:bg-ink hover:text-white";

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${headerStyles}`}>
      {!isHome && (
        <div className="bg-ink text-white">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-wrap items-center justify-between gap-4 text-[0.65rem] uppercase tracking-[0.3em]">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                +233 24 288 5908
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                info@thechurchofpentecost.org
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                # 2 Pentecost lane Oyarifa-Teiman, Ghana
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Search" className="hover:text-wheat">
                <Search className="h-4 w-4" />
              </button>
              {siteContent?.social_facebook_url && (
                <a
                  href={siteContent.social_facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="hover:text-wheat"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {siteContent?.social_instagram_url && (
                <a
                  href={siteContent.social_instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="hover:text-wheat"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {siteContent?.social_youtube_url && (
                <a
                  href={siteContent.social_youtube_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="hover:text-wheat"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="The Church of Pentecost logo" className="h-10 w-10" />
          <span className="font-display text-lg leading-tight">
            <span className={`block ${isHome ? "text-white" : "text-ink"}`}>The Church of Pentecost</span>
            <span
              className={`block text-xs uppercase tracking-[0.3em] ${
                isHome ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Oyarifa Worship Center
            </span>
          </span>
        </Link>
        <nav className={`hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.3em] ${navText}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition border-b-2 ${isActive ? navActive : navInactive}`}
              >
                {item.label}
              </Link>
            );
          })}
          {user?.role === "admin" && (
            <Link href="/admin" className={`text-xs uppercase tracking-[0.3em] ${isHome ? "text-wheat" : "text-ember"}`}>
              Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className={authButton}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className={authButton}
            >
              Login
            </Link>
          )}
        </nav>
        <button
          className={`md:hidden p-2 ${isHome ? "text-white" : "text-ink"}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div
          className={`md:hidden border-t px-4 py-4 space-y-3 ${
            isHome ? "border-slate-800 bg-slate-950 text-white" : "border-slate-200 bg-white text-ink"
          }`}
        >
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
            <button onClick={logout} className={`w-full px-5 py-2 ${isHome ? "rounded-full border border-wheat text-wheat" : "rounded-none border border-slate-200"}`}>
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className={`block w-full px-5 py-2 ${isHome ? "rounded-full border border-wheat text-wheat" : "rounded-none border border-slate-200"}`}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
