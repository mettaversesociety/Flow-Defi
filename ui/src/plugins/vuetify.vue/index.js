import {createVuetify} from 'vuetify'
import defaults from './defaults'
import theme from './theme'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {md2} from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    blueprint: md2,
    defaults,
    theme,
    components,
    directives,
})
