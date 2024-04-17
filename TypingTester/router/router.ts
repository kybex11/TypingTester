import { createMemoryHistory, createRouter } from 'vue-router';

import Home from '../src/views/Home.vue';

const routes = [
  { path: '/', component: Home},
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
