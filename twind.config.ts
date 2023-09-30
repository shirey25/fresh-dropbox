import { Options } from "$fresh/plugins/twind.ts";
import { setup } from "twind";

const options: Options = {
  // Other configuration options
  persistSession: true,
  storage: window.localStorage, // Provide an appropriate storage object
  darkMode: "class",
   theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Inter", "serif"],
    },
    extend: {
      colors: {
        primary: "#0FBA81",
        secondary: "#4F46E5",
        tertiary: "#0EA5E9",
      },
    },
  },
};

// Call the setup function with the options object
setup(options);

// Export the options object as the default export
export default options;