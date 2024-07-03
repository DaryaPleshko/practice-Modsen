import React, { createContext, ReactNode } from 'react';
import { iForm } from '../interface';
interface iSearchBooksProviderProps {
  children: ReactNode;
  searchBooks: (form: iForm) => void;
}

const SearchBooksContext = createContext<(form: iForm) => void>(() => {});

export const SearchBooksProvider: React.FC<iSearchBooksProviderProps> = ({ children, searchBooks }) => {
  return <SearchBooksContext.Provider value={searchBooks}>{children}</SearchBooksContext.Provider>;
};

export default SearchBooksContext;
