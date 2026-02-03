const tenets = [
  "The Bible is the inspired Word of God.",
  "Salvation is by grace through faith in Jesus Christ.",
  "The Holy Spirit empowers every believer.",
  "The church exists to make disciples.",
  "Prayer is essential for every season.",
  "Holiness honors God and blesses people."
];

export function Tenets() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tenets.map((tenet) => (
        <div key={tenet} className="rounded-none bg-white/90 p-5 shadow-soft-md">
          <p className="text-xs uppercase tracking-[0.3em] text-ember">Our Tenet</p>
          <p className="mt-3 text-sm text-slate-600">{tenet}</p>
        </div>
      ))}
    </div>
  );
}
