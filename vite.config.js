// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './',
    // e.g., if URL is yourdomain.com/my-app/, use '/my-app/'
    // If deploying to root, you can use './' or remove the base line.
});
