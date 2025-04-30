/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import MathJax, { initMathJax } from 'mathjax-vue3'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

// Initialize MathJax
initMathJax({})

// Create app
const app = createApp(App)

// Register plugins
registerPlugins(app)

// Register MathJax
app.use(MathJax)

// Mount app
app.mount('#app')
