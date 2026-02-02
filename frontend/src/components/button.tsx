import Link from "next/link";
import { clsx } from "clsx";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const styles = clsx(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm uppercase tracking-[0.2em] transition",
    variant === "primary"
      ? "bg-ember text-white hover:bg-clay"
      : "border border-ember text-ember hover:bg-ember hover:text-white",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
}
