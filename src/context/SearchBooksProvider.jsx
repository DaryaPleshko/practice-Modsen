import PropTypes from 'prop-types';
import { createContext } from 'react';

const SearchBooksContext = createContext();

export const SearchBooksProvider = ({ children, searchBooks }) => {
  return <SearchBooksContext.Provider value={searchBooks}>{children}</SearchBooksContext.Provider>;
};

SearchBooksProvider.propTypes = {
  children: PropTypes.node.isRequired,
  searchBooks: PropTypes.func.isRequired,
};

export default SearchBooksContext;
