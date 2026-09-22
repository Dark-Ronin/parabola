import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: globalThis.process?.env?.GITHUB_ACTIONS ? "/Kinetix/" : "/",
});