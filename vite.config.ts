import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api/clinicminds': {
                target: 'https://schedule.clinicminds.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api\/clinicminds/, ''),
                secure: true,
            },
        },
    },
});
