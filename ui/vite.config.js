import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),

        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            styles: {
                configFile: 'src/styles/variables/_vuetify.scss',
            },
        }),
        Pages({}),
        Layouts(),
        Components({
            dirs: ['src/@core/components'],
            dts: true,
        }),
        AutoImport({
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
            },
            imports: ['vue', 'vue-router', '@vueuse/core', 'vue-i18n', 'pinia'],
            vueTemplate: true,
        }),
        DefineOptions(),
    ],
    define: {
        'process.env': {},
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        // global: 'window'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', '/')),
            '@core': fileURLToPath(new URL('./src/@core', '/')),
            '@layouts': fileURLToPath(new URL('./src/@layouts', '/')),
            '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', '/')),
            '@axios': fileURLToPath(new URL('./src/plugins/axios', '/')),
            'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', '/')),
            process: "process/browser",
            stream: "stream-browserify",
            zlib: "browserify-zlib",
            util: 'util'
        },
    },
    build: {
        chunkSizeWarningLimit: 5000,
    },
    optimizeDeps: {
        exclude: ['vuetify'],
        entries: [
            './src/**/*.vue',
        ],
    },
})
