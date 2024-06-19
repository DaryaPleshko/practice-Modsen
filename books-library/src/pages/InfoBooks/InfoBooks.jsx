import style from './style.module.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';

const InfoBooks = () => {
    const { bookId } = useParams(); // Получение идентификатора книги из параметров маршрута
    const [book, setBook] = useState(null); // Состояние для хранения информации о книге

    useEffect(() => {
        const fetchBookDetails = async () => {
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
        };

        fetchBookDetails();
    }, [bookId]);

    if (!book) {
        return <p>Loading...</p>; // Загрузка пока данные не будут получены
    }

    return (
        <>
            <Header />
            <div className={style.containerInfo}>
                <div className={style.caseImg}>
                    {book.volumeInfo.imageLinks && (
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className={style.imageBook} />
                    )}
                </div>
                <div className={style.caseInfo}>
                    <p className={style.categoriesBook}>{book.volumeInfo.categories?.join(' / ')}</p>
                    <p className={style.titleBook}><b>{book.volumeInfo.title}</b></p>
                    <p className={style.authorBook}>{book.volumeInfo.authors?.join(', ')}</p>
                    <div>
                        <p className={style.aboutBook}><b>{book.volumeInfo.description}</b></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoBooks;
