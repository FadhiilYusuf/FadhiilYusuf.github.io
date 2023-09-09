import { createApp } from 'vue'
import App from './App.vue'
 
import axios from 'axios' // C:\vuejs\myapp>npm install --save axios vue-axios
 
import VueAxios from 'vue-axios'
 
 
createApp(App).use(VueAxios, axios).mount('#app')