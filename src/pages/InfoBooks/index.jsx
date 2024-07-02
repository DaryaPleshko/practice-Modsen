import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getBookById } from '../../api';
import { Header } from '../../components/Header';
import style from './style.module.scss';

const InfoBooks = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBookDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBookById(bookId);
      setBook(response.data);
    } catch (error) {
      console.error('Failed to fetch book details from Google Books API:', error);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  const stripHtmlTags = htmlString => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className={style.load}></div>
      ) : (
        <main className={style.containerInfo}>
          <div className={style.caseImg}>
            {book?.volumeInfo.imageLinks && (
              <img src={book?.volumeInfo.imageLinks.thumbnail} alt={book?.volumeInfo.title} className={style.imageBook} />
            )}
          </div>
          <div className={style.caseInfo}>
            <div
              onClick={() => {
                navigate('/');
              }}
              className={style.back}
            ></div>
            <p className={style.categoriesBook}>{book?.volumeInfo.categories?.join(' / ')}</p>
            <p className={style.titleBook}>
              <b>{book?.volumeInfo.title}</b>
            </p>
            <p className={style.authorBook}>{book?.volumeInfo.authors?.join(', ')}</p>
            <div>
              <div className={style.aboutBook}>
                <b>{book?.volumeInfo.description && stripHtmlTags(book?.volumeInfo.description)}</b>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export { InfoBooks };
