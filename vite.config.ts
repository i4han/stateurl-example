import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
    ],
    optimizeDeps: {
        include: [
            '@preact/signals-react',
            '@preact/signals-react/runtime',
            'use-sync-external-store/shim',
        ],
    },
    server: {
        port: 8000,
        host: true,
        allowedHosts: ['stateurl.com']
    },
    build: {
        outDir: 'dist',
    },
})
