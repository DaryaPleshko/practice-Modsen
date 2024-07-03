interface VolumeInfo {
  imageLinks?: {
    thumbnail: string;
  };
  categories?: string[];
  title?: string;
  authors?: string[];
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
  imageClass?: string;
}

interface NormalizedBook {
  id: string;
  imageUrl: string | null;
  categories: string;
  title: string;
  authors: string;
  imageClass: string;
}

export const normalizeBookData = (book: Book): NormalizedBook => {
  return {
    id: book.id,
    imageUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
    categories: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'No categories',
    title: book.volumeInfo.title || 'No title',
    authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author',
    imageClass: book.imageClass || 'defaultImageClass',
  };
};
