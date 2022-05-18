import { createStore } from 'vuex';

import bookModule from './modules/book-store';
import authModule from './modules/authentication';
import wishlistModule from './modules/wishlist';

const store = createStore({
  modules: { books: bookModule, authentication: authModule, wishList: wishlistModule },
});

export default store;
