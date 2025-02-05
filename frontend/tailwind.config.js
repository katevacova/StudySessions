/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        blue: "0 0 11px 0 rgba(27, 153, 139, 0.2)",
      },
      screens: {
        tablet: "764px",
        desktop: "1024px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#DECDF5",
          secondary: "#656176",
          accent: "#1B998B",
          neutral: "#F8F1FF",
          "base-100": "#ffffff",
          info: "#534D56",
          success: "#bae6fd",
          warning: "#fed7aa",
          error: "#fca5a5",
          gray: "#F3F4F6",
        },
      },
    ],
  },

  plugins: [require("daisyui")], //tady bylo ještě "@tailwindcss/typography" ale myslím že to nepoužíváme
};
