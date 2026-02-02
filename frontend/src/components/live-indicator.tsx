export function LiveIndicator({ isLive }: { isLive: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
      <span
        className={`h-2 w-2 rounded-full ${isLive ? "bg-ember animate-pulse" : "bg-slate-400"}`}
      />
      <span>{isLive ? "Live now" : "Offline"}</span>
    </div>
  );
}
