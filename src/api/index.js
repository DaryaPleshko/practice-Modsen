import axios from 'axios';

const getBooks = async (form, startIndex = 0, maxResults = 10) => {
  const API_KEY = 'AIzaSyAL8zHF2VMT2bFP6z9euyvZhufsPUqHkGY';
  const url = 'https://www.googleapis.com/books/v1/volumes';

  const response = await axios.get(url, {
    params: {
      q: form.title || 'all',
      orderBy: form.sorting || 'relevance',
      key: API_KEY,
      startIndex: startIndex,
      maxResults: maxResults,
    },
  });
  return response;
};

const getBookById = async bookId => {
  const API_KEY = 'AIzaSyAL8zHF2VMT2bFP6z9euyvZhufsPUqHkGY';
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

  const response = await axios.get(url, {
    params: {
      key: API_KEY,
    },
  });
  return response;
};
export { getBooks, getBookById };
