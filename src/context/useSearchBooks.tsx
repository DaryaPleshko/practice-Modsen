import { useContext } from 'react';

import { iForm } from '../interface';
import SearchBooksContext from './SearchBooksProvider';

export const useSearchBooks = () => {
  const searchBooks = useContext(SearchBooksContext);

  if (!searchBooks) {
    throw new Error('useSearchBooks must be used within a SearchBooksProvider');
  }

  const callSearchBooks = (form: iForm) => {
    searchBooks(form);
  };

  return callSearchBooks;
};
