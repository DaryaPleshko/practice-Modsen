import style from './style.module.scss';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { getBookById } from '../../api';

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
              <p className={style.aboutBook}>
                <b>{book?.volumeInfo.description}</b>
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export { InfoBooks };
