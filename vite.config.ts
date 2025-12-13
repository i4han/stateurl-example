import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['module:@preact/signals-react-transform']],
            },
        }),
    ],
    server: {
        port: 8000,
        host: true,
	allowedHosts: ['stateurl.com']
    },
    build: {
        outDir: 'dist',
    },
})
