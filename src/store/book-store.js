import axios from 'axios';

export default {
  state() {
    return {
      books: [],
    };
  },
  mutations: {
    setBooks(state, payload) {
      state.books = payload;
    },
  },
  actions: {
    async fetchBooks(context) {
      const response = await axios(
        'https://www.googleapis.com/books/v1/volumes?q=inauthor:Stephen+King&key=AIzaSyB-Rk9X57Vgi2gP26Dfi6sTFgL-eynPhoI',
      );

      const bookItems = response.data.items.map((book) => ({
        id: book.id,
        title: book.volumeInfo.title,
        thumbnail:
          book.volumeInfo.imageLinks === undefined
            ? ''
            : `${book.volumeInfo.imageLinks.thumbnail}`,
        categories: book.volumeInfo.categories,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        description: book.volumeInfo.description,
        pageCount: book.volumeInfo.pageCount,
        publishedDate: book.volumeInfo.publishedDate,
        averageRating: book.volumeInfo.averageRating,
        buyLink: book.saleInfo.buyLink,
      }));

      context.commit('setBooks', bookItems);
    },
  },
  getters: {
    getBooks(state) {
      return state.books;
    },
  },
};
