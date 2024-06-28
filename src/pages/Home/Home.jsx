import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { getBooks } from '../../api';
import style from './style.module.scss';
import { SearchBooksProvider } from '../../context/SearchBooksProvider';

const normalizeBookData = book => {
  return {
    id: book.id,
    imageUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
    categories: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'No categories',
    title: book.volumeInfo.title || 'No title',
    authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author',
    imageClass: book.imageClass || 'defaultImageClass',
  };
};

const Home = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', subject: 'all', sorting: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        <p className={style.numberOfResults}>Found {books.length} results</p>
        <div className={style.containerBooks}>
          {loading ? (
            <div className={style.load}></div>
          ) : (
            books.map((book, i) => (
              <div key={i} onClick={() => handleBookClick(book.id)} className={style.bookItem}>
                {book.imageUrl && <img src={book.imageUrl} alt="Book" className={style[book.imageClass]} />}
                <p className={style.wayBook}>{book.categories}</p>
                <p className={style.nameBook}>
                  <b>{book.title}</b>
                </p>
                <p className={style.author}>{book.authors}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </SearchBooksProvider>
  );
};

export { Home };
