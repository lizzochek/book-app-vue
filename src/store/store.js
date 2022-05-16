import { createStore } from 'vuex';

import bookModule from './book-store';

const store = createStore({
  modules: { books: bookModule },
});

export default store;
