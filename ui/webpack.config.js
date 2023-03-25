const path = require('path')
const {fileURLToPath} = require("url");
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new VuetifyPlugin({ autoImport: true }), // Enabled by default
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', '/')),
            '@core': fileURLToPath(new URL('./src/@core', '/')),
            '@layouts': fileURLToPath(new URL('./src/@layouts', '/')),
            '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', '/')),
            '@axios': fileURLToPath(new URL('./src/plugins/axios', '/')),
            'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', '/')),
        },
    },
}
