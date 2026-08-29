/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "grove-dark": "#0f172a",
        "grove-panel": "#1e293b",
        "math-purple": "#8b5cf6",
        "code-cyan": "#06b6d4",
        "sciml-green": "#10b981",
        "intuition-amber": "#f59e0b",
        "proof-slate": "#64748b",
        "grove-accent": "#8b5cf6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
