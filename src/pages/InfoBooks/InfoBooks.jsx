import style from './style.module.scss';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';

const InfoBooks = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  const fetchBookDetails = useCallback(async () => {
    const API_KEY = 'AIzaSyAo-wFx9JQiJ3NnZlaygtzcQjMmTp80F2Y';
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    try {
      const response = await axios.get(url, {
        params: {
          key: API_KEY,
        },
      });
      setBook(response.data); // Установка данных книги в состояние
    } catch (error) {
      console.error('Failed to fetch book details from Google Books API:', error);
    }
  }, [bookId]); // Добавьте bookId в массив зависимостей useCallback

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]); // Добавьте fetchBookDetails в массив зависимостей useEffect

  if (!book) {
    return <p>Loading...</p>; // Загрузка пока данные не будут получены
  }

  const { volumeInfo } = book;

  // Очистка HTML-тегов из строки
  const removeHtmlTags = str => {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.textContent || div.innerText || '';
  };

  const description = volumeInfo.description ? removeHtmlTags(volumeInfo.description) : 'Описание отсутствует.';

  return (
    <>
      <Header />

      <main className={style.containerInfo}>
        <div className={style.caseImg}>
          {volumeInfo.imageLinks && <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} className={style.imageBook} />}
        </div>
        <div className={style.caseInfo}>
          <p className={style.categoriesBook}>{volumeInfo.categories?.join(' / ')}</p>
          <p className={style.titleBook}>
            <b>{volumeInfo.title}</b>
          </p>
          <p className={style.authorBook}>{volumeInfo.authors?.join(', ')}</p>
          <div>
            <p className={style.aboutBook}>
              <b>{description}</b>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default InfoBooks;
