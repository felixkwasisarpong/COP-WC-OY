import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1f3b",
        ember: "#1f5fa8",
        clay: "#2f77c7",
        wheat: "#f2c94c",
        sage: "#14345a",
        mist: "#eef5ff"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top left, rgba(31,95,168,0.35), transparent 55%)",
        "warm-gradient": "linear-gradient(135deg, #eef5ff 0%, #f2c94c 35%, #ffffff 100%)"
      },
      boxShadow: {
        "soft-xl": "0 20px 40px rgba(16, 15, 10, 0.15)",
        "soft-md": "0 12px 24px rgba(16, 15, 10, 0.12)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "float": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        "float": "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
