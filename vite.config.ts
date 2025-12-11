import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// When deploying to GitHub Pages under https://joegrowth.github.io/roleweaver/
// the base must be the repository name so built assets resolve correctly.
export default defineConfig({
  base: "/roleweaver/",
  plugins: [react()],
});
