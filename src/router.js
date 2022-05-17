import { createRouter, createWebHistory } from 'vue-router';

import BookView from './components/books/BookView.vue';
import BookDetails from './components/books/BookDetails.vue';
import NotFound from './components/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/books' },
    { path: '/books', component: BookView },
    { path: '/books/:id', props: true, component: BookDetails },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
