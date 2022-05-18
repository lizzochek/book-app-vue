import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      wishListBooks: [],
      currentPage: 1,
    };
  },
  mutations: {
    addBook(state, payload) {
      state.wishListBooks[state.wishListBooks.length] = payload;
    },
    setBooks(state, payload) {
      state.wishListBooks = payload;
    },
  },
  actions: {
    async addToWishList(context, payload) {
      const response = await axios.post(
        `https://book-app-vue-default-rtdb.europe-west1.firebasedatabase.app/wishlist/${this.getters['authentication/userId']}.json`,
        { ...payload },
        {
          params: {
            name: payload.id,
          },
        },
      );

      if (response.statusText !== 'OK') {
        throw new Error('Something went wrong');
      }

      context.commit('addBook', payload);
    },
    async fetchFromWishList(context) {
      const response = await axios(
        `https://book-app-vue-default-rtdb.europe-west1.firebasedatabase.app/wishlist/${this.getters['authentication/userId']}.json`,
      );

      if (response.statusText !== 'OK') {
        throw new Error('Something went wrong');
      }

      if (!response.data) {
        context.commit('setBooks', []);
      } else {
        context.commit('setBooks', response.data);
      }
    },
    addBook(context, payload) {
      context.commit('addBook', payload);
    },
  },
  getters: {
    getWishlist(state) {
      return state.wishListBooks;
    },
  },
};
