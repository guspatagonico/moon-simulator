// Vite build configuration for Moon Phases Simulator by Gustavo Adrián Salvini <guspatagonico@gmail.com>
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/moon-simulator/',
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['three', 'lil-gui'],
  },
});
