"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "admin") {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="py-16 text-center text-sm text-slate-500">Checking access...</p>;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
