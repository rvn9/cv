import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './directives/reveal'
import './style.css'
import './tailwind.css'

createApp(App).directive('reveal', vReveal).mount('#app')
