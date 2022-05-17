const defaultImgUrl = 'https://demo.publishr.cloud/assets/common/images/edition_placeholder.png';

const changeBook = (book) => ({
  id: book.id,
  title: book.volumeInfo.title,
  thumbnail:
    book.volumeInfo.imageLinks === undefined
      ? defaultImgUrl
      : `${book.volumeInfo.imageLinks.thumbnail}`,
  categories: book.volumeInfo.categories,
  authors: book.volumeInfo.authors ? book.volumeInfo.authors.toString() : '',
  publisher: book.volumeInfo.publisher ? book.volumeInfo.publisher : 'No publisher information',
  description: book.volumeInfo.description ? book.volumeInfo.description : 'No description yet',
  pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 'Pages number unknown',
  publishedDate: book.volumeInfo.publishedDate
    ? book.volumeInfo.publishedDate
    : 'No date available',
  averageRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0,
  buyLink: book.saleInfo.buyLink,
});

const filterAlphabet = (books, mode) => {
  books.sort((a, b) => a.title.localeCompare(b.title));
  if (mode === 'desc') books.reverse();
};

const filterRating = (books) => {
  books.sort((a, b) => b.averageRating - a.averageRating);
};

const filterDate = (books) => {
  books.sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate));
};

const filterBooks = (books, type) => {
  switch (type) {
    case 'alphabet-asc':
      filterAlphabet(books, 'asc');
      break;
    case 'alphabet-desc':
      filterAlphabet(books, 'desc');
      break;
    case 'publicationDate':
      filterDate(books);
      break;
    case 'rating':
      filterRating(books);
      break;
    default:
      filterAlphabet(books, 'asc');
      break;
  }
};

// prettier-ignore
export {
  changeBook,
  filterBooks,
};
