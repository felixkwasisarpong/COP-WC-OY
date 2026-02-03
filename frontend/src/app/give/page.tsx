"use client";

import { useState } from "react";
import { createGivingIntent } from "@/services/giving";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";

const categories = ["Tithes", "Offerings", "Missions", "Building Fund"];

export default function GivePage() {
  const [amount, setAmount] = useState("50");
  const [frequency, setFrequency] = useState<"one-time" | "recurring">("one-time");
  const [category, setCategory] = useState(categories[0]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await createGivingIntent({
        amount: Math.round(Number(amount) * 100),
        currency: "usd",
        frequency,
        category
      });
      setMessage(response.message);
    } catch (error) {
      setMessage("Unable to start giving right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      <SectionHeading
        eyebrow="Online giving"
        title="Generosity that transforms lives"
        description="Secure, flexible giving options to support ministry, missions, and community care."
      />

      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="rounded-none bg-white/80 p-8 shadow-soft-xl space-y-6">
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ember">Amount</label>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-2xl font-display text-ember">₵</span>
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full rounded-none border border-wheat bg-white/70 px-4 py-3 text-lg"
                type="number"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ember">Frequency</label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(["one-time", "recurring"] as const).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setFrequency(option)}
                  className={`rounded-none border px-4 py-3 text-sm uppercase tracking-[0.2em] transition ${
                    frequency === option
                      ? "border-ember bg-ember text-white"
                      : "border-wheat text-slate-600 hover:border-ember"
                  }`}
                >
                  {option === "one-time" ? "One-Time" : "Recurring"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ember">Category</label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {categories.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setCategory(option)}
                  className={`rounded-none border px-4 py-3 text-sm transition ${
                    category === option
                      ? "border-ember bg-ember text-white"
                      : "border-wheat text-slate-600 hover:border-ember"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <Button className="rounded-none">{loading ? "Preparing..." : "Continue"}</Button>
          {message && <p className="text-sm text-slate-600">{message}</p>}
        </form>

        <div className="space-y-6">
          <div className="rounded-none bg-ember text-white p-8 shadow-soft-xl">
            <h3 className="font-display text-2xl">Safe and secure</h3>
            <p className="mt-3 text-sm text-white/80">
              We partner with trusted payment providers. No payment data is stored on our servers.
            </p>
          </div>
          <div className="rounded-none bg-white/80 p-8 shadow-soft-md text-sm text-slate-600 space-y-2">
            <p>Need help with giving? Email finance@thechurchofpentecost.org.</p>
            <p>Looking for year-end statements? Log in to your member portal (coming soon).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
