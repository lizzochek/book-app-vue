import { createRouter, createWebHistory } from 'vue-router';

import BookView from './components/pages/books/BookView.vue';
import BookDetails from './components/pages/books/BookDetails.vue';
import NotFound from './components/pages/NotFound.vue';
import UserAuth from './components/pages/UserAuth.vue';
import WishList from './components/pages/WishList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/books' },
    { path: '/books', component: BookView },
    { path: '/books/:id', props: true, component: BookDetails },
    { path: '/authentication', component: UserAuth },
    { path: '/wishlist', component: WishList },
    { path: '/wishlist/:id', component: BookDetails, props: true },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
