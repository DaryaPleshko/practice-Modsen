export const normalizeBookData = book => {
  return {
    id: book.id,
    imageUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
    categories: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'No categories',
    title: book.volumeInfo.title || 'No title',
    authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author',
    imageClass: book.imageClass || 'defaultImageClass',
  };
};
