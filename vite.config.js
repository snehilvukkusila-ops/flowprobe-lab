import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo name must match the GitHub Pages project-site base path
// (https://<user>.github.io/flowprobe-screenshot-app/).
export default defineConfig({
  plugins: [react()],
  base: '/flowprobe-screenshot-app/',
})
