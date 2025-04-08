
import * as path from "node:path";

export default {
    root: './source',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        minify: false,
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@/helpers': path.resolve(__dirname, 'source/helpers/'),
            '@/components': path.resolve(__dirname, 'source/components/'),
            '@/assets': path.resolve(__dirname, 'source/assets/'),
            '@/theme': path.resolve(__dirname, 'source/theme/'),
            '@/router': path.resolve(__dirname, 'source/router/'),
            '@/types': path.resolve(__dirname, 'source/types/'),
            '@/views': path.resolve(__dirname, 'source/views/'),
            '@/': path.resolve(__dirname, 'source/'),
        },
    },
}
