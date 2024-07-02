import { useContext } from 'react';

import SearchBooksContext from './SearchBooksProvider';

export const useSearchBooks = () => useContext(SearchBooksContext);
