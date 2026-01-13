module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wrong: "#8B0000", // Dark red
      },
      animation: {
        crack: "crack 1s ease-in-out forwards",
        fall: "fall 1s ease-in-out forwards",
      },
      keyframes: {
        crack: {
          "0%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(0.5)", borderBottom: "2px solid white" },
          "100%": { transform: "scaleX(1)" },
        },
        fall: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
      }
    },
  },
  darkMode: "class"
};
