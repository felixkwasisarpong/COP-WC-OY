"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { useAuth } from "@/hooks/use-auth";

export default function MemberLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 space-y-10">
      <SectionHeading
        eyebrow="Members"
        title="Member login"
        description="Sign in to access member-only resources and downloads."
      />
      <form onSubmit={handleSubmit} className="rounded-[2.5rem] bg-white/80 p-8 shadow-soft-xl space-y-4">
        <label className="text-sm text-slate-600">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-wheat bg-white/70 px-4 py-3"
            type="email"
            required
          />
        </label>
        <label className="text-sm text-slate-600">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-wheat bg-white/70 px-4 py-3"
            type="password"
            required
          />
        </label>
        <Button>{loading ? "Signing in..." : "Sign in"}</Button>
        {error && <p className="text-sm text-ember">{error}</p>}
      </form>
    </div>
  );
}
