import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs principales du portfolio
        beige: {
          light: "#F5F1E8",
          DEFAULT: "#F5F1E8",
          dark: "#E8E4DB",
        },
        violet: {
          pastel: "#A78BFA",
          light: "#E9D5FF",
          DEFAULT: "#A78BFA",
        },
        rose: {
          soft: "#F472B6",
          DEFAULT: "#F472B6",
        },
        // Alias pratiques
        primary: "#A78BFA",
        secondary: "#F472B6",
        accent: "#E9D5FF",
        background: "#F5F1E8",
      },
      fontFamily: {
        // Typographie principale pour les titres
        display: ["Motley Forces", "serif"],
        // Typographie secondaire pour les textes
        body: ["Super Malibu", "sans-serif"],
        // Fallback system fonts
        sans: ["Super Malibu", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Motley Forces", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["6rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.3" }],
        "body-xl": ["1.5rem", { lineHeight: "1.6" }],
        "body-lg": ["1.25rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.7" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      backgroundImage: {
        // Grille en arrière-plan - plus visible pour correspondre au design
        grid: "linear-gradient(to right, rgba(167, 139, 250, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(167, 139, 250, 0.2) 1px, transparent 1px)",
        "grid-dense":
          "linear-gradient(to right, rgba(167, 139, 250, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(167, 139, 250, 0.25) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
        "grid-dense": "20px 20px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(167, 139, 250, 0.15)",
        card: "0 8px 30px rgba(167, 139, 250, 0.1)",
        hover: "0 12px 40px rgba(167, 139, 250, 0.2)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
