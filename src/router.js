import { createRouter, createWebHistory } from 'vue-router';

import BookView from './components/books/BookView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/books', component: BookView }],
});

export default router;
