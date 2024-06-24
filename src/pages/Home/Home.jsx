import style from './style.module.scss';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

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
  const navigate = useNavigate();

  const searchBooks = useCallback(async () => {
    const API_KEY = 'AIzaSyAo-wFx9JQiJ3NnZlaygtzcQjMmTp80F2Y';
    const url = 'https://www.googleapis.com/books/v1/volumes';

    const query = `${form.title}${form.subject && form.subject !== 'all' ? `+subject:${form.subject}` : ''}`;

    try {
      const response = await axios.get(url, {
        params: {
          q: query || 'all',
          orderBy: form.sorting || 'relevance',
          key: API_KEY,
          maxResults: 40,
        },
      });

      const normalizedData = (response.data.items || []).map(normalizeBookData);
      setBooks(normalizedData);
    } catch (error) {
      console.error('Failed to fetch books from Google Books API:', error);
    }
  }, [form]); // Добавьте form в массив зависимостей useCallback

  useEffect(() => {
    searchBooks();
  }, [searchBooks]); // Добавьте searchBooks в массив зависимостей useEffect

  const handleBookClick = bookId => {
    navigate(`/info-books/${bookId}`);
  };

  return (
    <>
      <Header form={form} setForm={setForm} searchBooks={searchBooks}></Header>

      <section className={style.main}>
        <p className={style.numberOfResults}>Found {books.length} results</p>
        <div className={style.containerBooks}>
          {books.map((book, i) => (
            <div key={i} onClick={() => handleBookClick(book.id)} className={style.bookItem}>
              {book.imageUrl && <img src={book.imageUrl} alt="Book" className={style[book.imageClass]} />}
              <p className={style.wayBook}>{book.categories}</p>
              <p className={style.nameBook}>
                <b>{book.title}</b>
              </p>
              <p className={style.author}>{book.authors}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
