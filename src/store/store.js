import { createStore } from 'vuex';

import bookModule from './modules/book-store';
import authModule from './modules/authentication';

const store = createStore({
  modules: { books: bookModule, authentication: authModule },
});

export default store;
