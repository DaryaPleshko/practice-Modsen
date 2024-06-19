import style from './style.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Home = () => {
    const [books, setBooks] = useState([]); // хранится массив который отображается книг после запроса
    const [form, setForm] = useState({ title: '', subject: 'all', sorting: '' }); // состояние для формы
    const navigate = useNavigate(); // хук для навигации

    const searchBooks = async () => {
        const API_KEY = 'AIzaSyAo-wFx9JQiJ3NnZlaygtzcQjMmTp80F2Y';
        const url = 'https://www.googleapis.com/books/v1/volumes';
        const query = `${form.title}${form.subject && form.subject !== 'all' ? `+subject:${form.subject}` : ''}`;

        try {
            const response = await axios.get(url, {
                params: {
                    q: query || 'all',
                    orderBy: form.sorting || 'relevance',
                    key: API_KEY,
                    maxResults: 40
                },
            });

            setBooks(response.data.items || []);
        } catch (error) {
            console.error('Failed to fetch books from Google Books API:', error);
        }
    };

    useEffect(() => {
        searchBooks();
    }, []);

    const handleBookClick = (bookId) => {
        navigate(`/info-books/${bookId}`);
    };

    return (
        <>
            <Header form={form} setForm={setForm} searchBooks={searchBooks}></Header>

            <div className={style.main}>
                <p className={style.numberOfResults}>Found {books.length} results</p>

                <div className={style.containerBooks}>
                    {books.map((el, i) => (
                        <div key={i} onClick={() => handleBookClick(el.id)} className={style.bookItem}>
                            {el.volumeInfo.imageLinks && (
                                <img src={el.volumeInfo.imageLinks.thumbnail} alt="Book" className={style[el.imageClass]} />
                            )}
                            <p className={style.wayBook}>{el.volumeInfo.categories}</p>
                            <b>
                                <p className={style.nameBook}>{el.volumeInfo.title}</p>
                            </b>
                            <p className={style.author}>{el.volumeInfo.authors}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
