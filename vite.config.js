import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      // A bemutató példái (src/examples) `import { Button } from "sze-ui"` formában
      // hivatkoznak a könyvtárra, ahogy egy majdani npm-csomag felhasználója írná.
      // Pontos egyezésű regex: a "./sze-ui" relatív importokat nem érinti.
      { find: /^sze-ui$/, replacement: fileURLToPath(new URL('./src/sze-ui/index.js', import.meta.url)) },
    ],
  },
  server: { hmr: { overlay: true } },
});
