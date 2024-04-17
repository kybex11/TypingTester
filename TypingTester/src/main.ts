import { createApp } from 'vue'
import Home from './views/Home.vue';
import router from '../router/router';

createApp(Home)
  .use(router)
  .mount('#app')
