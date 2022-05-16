import axios from 'axios';

import changeBook from './helpers';

export default {
  state() {
    return {
      books: [],
    };
  },
  mutations: {
    setBooks(state, payload) {
      payload.forEach((c) => {
        state.books.push(c);
      });
    },
  },
  actions: {
    async fetchBooks(context) {
      const response = await axios(
        'https://www.googleapis.com/books/v1/volumes?q=inauthor:Stephen+King&key=AIzaSyB-Rk9X57Vgi2gP26Dfi6sTFgL-eynPhoI',
      );

      const bookItems = response.data.items.map(changeBook);

      context.commit('setBooks', bookItems);
    },
  },
  getters: {
    getBooks(state) {
      return state.books;
    },
  },
};