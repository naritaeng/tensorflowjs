import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'

const app = createApp(App)
app.config.globalProperties.$tf = tf
app.config.globalProperties.$mobilenet = mobilenet

app.use(router).mount('#app')
