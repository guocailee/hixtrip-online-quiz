import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "virtual:windi.css"; 
createApp(App).use(ElementPlus).mount('#app')
