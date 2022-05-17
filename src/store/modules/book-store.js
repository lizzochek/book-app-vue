import axios from 'axios';

import { changeBook } from '../helpers';

export default {
  state() {
    return {
      books: [],
      searchOption: 'Stephen King',
      currentPage: 1,
    };
  },
  mutations: {
    setBooks(state, payload) {
      payload.forEach((c) => {
        state.books.push(c);
      });
    },
    setSearchOption(state, payload) {
      state.searchOption = payload;
    },
    clearBooks(state) {
      state.books.splice(0, state.books.length);
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },
  actions: {
    async fetchBooks(context) {
      const response = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${this.getters.getSearchOption}&maxResults=40&startIndex=1&key=AIzaSyB-Rk9X57Vgi2gP26Dfi6sTFgL-eynPhoI`,
      );

      const bookItems = response.data.items.map(changeBook);

      context.commit('setBooks', bookItems);
    },
    clearBooks(context) {
      context.commit('clearBooks');
    },
    assignSearchOption(context, payload) {
      context.commit('setSearchOption', payload);
    },
    assignCurrentPage(context, payload) {
      context.commit('setCurrentPage', payload);
    },
  },
  getters: {
    getBooks(state) {
      return state.books;
    },
    getSearchOption(state) {
      return state.searchOption;
    },
    getBookById: (state) => (id) => state.books.find((book) => book.id === id),
    getCurrentPage(state) {
      return state.currentPage;
    },
  },
};
