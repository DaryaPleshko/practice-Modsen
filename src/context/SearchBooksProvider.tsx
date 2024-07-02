import { createContext } from 'react';

const SearchBooksContext = createContext();

export const SearchBooksProvider = ({ children, searchBooks }) => {
  return <SearchBooksContext.Provider value={searchBooks}>{children}</SearchBooksContext.Provider>;
};

export default SearchBooksContext;
