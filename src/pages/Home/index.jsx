import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getBooks } from '../../api';
import { Header } from '../../components/Header';
import { SearchBooksProvider } from '../../context/SearchBooksProvider';
import { normalizeBookData } from '../../helpers';
import style from './style.module.scss';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', subject: 'all', sorting: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadMoreBooks = async () => {
    setLoading(true);
    try {
      const response = await getBooks(form, books.length, 30);

      const newBooks = (response.data.items || []).map(normalizeBookData);
      setBooks(prevBooks => [...prevBooks, ...newBooks]);
    } catch (error) {
      console.error('Failed to fetch books from Google Books API:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBooks(form);

      const normalizedData = (response.data.items || []).map(normalizeBookData);
      setBooks(normalizedData);
    } catch (error) {
      console.error('Failed to fetch books from Google Books API:', error);
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    searchBooks();
  }, [searchBooks]);

  const handleBookClick = bookId => {
    navigate(`/info-books/${bookId}`);
  };

  return (
    <SearchBooksProvider searchBooks={searchBooks}>
      <Header form={form} setForm={setForm} />
      <section className={style.main}>
        <p className={style.numberOfResults} aria-live="polite">
          Found {books.length} results
        </p>
        <div className={style.containerBooks}>
          {loading ? (
            <div className={style.load}></div>
          ) : (
            books.map(book => (
              <article key={book.id} onClick={() => handleBookClick(book.id)} className={style.bookItem}>
                {book.imageUrl && <img src={book.imageUrl} alt="Book" className={style[book.imageClass]} />}
                <p className={style.wayBook}>{book.categories}</p>
                <p className={style.nameBook}>
                  <b>{book.title}</b>
                </p>
                <p className={style.author}>{book.authors}</p>
              </article>
            ))
          )}
        </div>
        <button onClick={loadMoreBooks} className={style.loadMoreButton}>
          {loading ? <div className={style.load}></div> : 'Load more'}
        </button>
      </section>
    </SearchBooksProvider>
  );
};

export { Home };
