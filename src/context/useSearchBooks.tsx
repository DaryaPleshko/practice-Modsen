import { useContext } from 'react';
import SearchBooksContext from './SearchBooksProvider';
import { iForm } from '../interface';

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
