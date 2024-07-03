import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getBookById } from '../../api';
import { Header } from '../../components/Header';
import { iForm } from '../../interface';
import style from './style.module.scss';

interface BookVolumeInfo {
  title: string;
  authors: string[];
  categories: string[];
  description: string;
  imageLinks?: {
    thumbnail: string;
  };
}
interface Book {
  volumeInfo: BookVolumeInfo;
}

const InfoBooks: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<iForm>({ title: '', subject: 'all', sorting: '' });
  const navigate = useNavigate();

  const fetchBookDetails = useCallback(async () => {
    setLoading(true);
    try {
      if (bookId) {
        const response = await getBookById(bookId);
        setBook(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch book details from Google Books API:', error);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  const stripHtmlTags = (htmlString: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  return (
    <>
      <Header form={form} setForm={setForm} />
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
