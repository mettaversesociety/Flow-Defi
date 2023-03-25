import App from '@/App.vue'
import {loadFonts} from '@/plugins/webfontloader'
import router from '@/router/index'
import '@/styles/styles.scss'
import {createPinia} from 'pinia'
import {createApp} from 'vue'
import vuetify from "@/plugins/vuetify.vue/index";
import db from '@/firebase/init'

loadFonts()
const app = createApp(App)
    .use(vuetify)
    .use(createPinia())
    .use(router)
app.mount('#app')
