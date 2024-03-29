import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'

import BeigeUi from './beige-ui'

const app = createApp(App)
app.use(BeigeUi)
app.mount('#app')
