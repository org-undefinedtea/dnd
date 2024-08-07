import './asset/vendor/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { VueQueryPlugin } from '@tanstack/vue-query'

import DnD from './DnD.vue'
import route from './route'

const dnd = createApp(DnD)

dnd.use(createPinia())
dnd.use(route)

dnd.use(VueQueryPlugin)

dnd.mount('#dnd')
