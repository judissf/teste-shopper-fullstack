import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [react(), envCompatible()],
  server: { port: 80, },
  envPrefix: ['VITE_', 'REACT_APP_'],
});
