import { createRouter, createWebHistory } from 'vue-router';

import BookView from './components/pages/books/BookView.vue';
import BookDetails from './components/pages/books/BookDetails.vue';
import NotFound from './components/pages/NotFound.vue';
import UserAuth from './components/pages/UserAuth.vue';
import WishList from './components/pages/WishList.vue';

import store from './store/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/books' },
    { path: '/books', component: BookView },
    { path: '/books/:id', props: true, component: BookDetails },
    { path: '/authentication', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/wishlist', component: WishList, meta: { requiresAuth: true } },
    {
      path: '/wishlist/:id',
      component: BookDetails,
      meta: { requiresAuth: true },
      props: true,
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['authentication/isLoggedIn']) {
    next('/authentication');
  } else if (to.meta.requiresUnauth && store.getters['authentication/isLoggedIn']) {
    next('/books');
  } else {
    next();
  }
});

export default router;
