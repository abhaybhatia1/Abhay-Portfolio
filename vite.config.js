import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    react()
  ],
  // Use '/' in dev (npm run dev) so localhost:5173 works,
  // use '/Abhay-Portfolio/' for production build (GitHub Pages)
  base: command === 'build' ? '/Abhay-Portfolio/' : '/',
}));