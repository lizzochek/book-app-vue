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
  publisher: book.volumeInfo.publisher,
  description: book.volumeInfo.description ? book.volumeInfo.description : 'No description yet',
  pageCount: book.volumeInfo.pageCount,
  publishedDate: book.volumeInfo.publishedDate,
  averageRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating yet',
  buyLink: book.saleInfo.buyLink,
});

export default changeBook;
