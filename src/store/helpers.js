const defaultImgUrl = 'https://demo.publishr.cloud/assets/common/images/edition_placeholder.png';

const changeBook = (book) => ({
  id: book.id,
  title: book.volumeInfo.title,
  thumbnail:
    book.volumeInfo.imageLinks === undefined
      ? defaultImgUrl
      : `${book.volumeInfo.imageLinks.thumbnail}`,
  categories: book.volumeInfo.categories,
  authors: book.volumeInfo.authors.toString(),
  publisher: book.volumeInfo.publisher ? book.volumeInfo.publisher : 'No publisher information',
  description: book.volumeInfo.description ? book.volumeInfo.description : 'No description yet',
  pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 'Pages number unknown',
  publishedDate: book.volumeInfo.publishedDate
    ? book.volumeInfo.publishedDate
    : 'No date available',
  averageRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating yet',
  buyLink: book.saleInfo.buyLink,
});

export default changeBook;
