import axios from 'axios';
import style from './style.module.css'
import React, { useState, useEffect } from 'react';

const Header = ({ form, setForm, searchBooks }) => {

    function changeInputsForm(key, value) {
        setForm({ ...form, [key]: value })
    }

    async function getBooksByForm() {
        searchBooks()
        // setForm({ title: 'all', subject: 'all', sorting: 'relevance' })
    }

    return (
        <div className={style.header}>
            <div className={style.wrapper}>
                <p className={style.name}> <b>Search for books </b></p>
                <div className={style.searchWrapper}>
                    <div className={style.searchContainer}>
                        <input onChange={(e) => changeInputsForm('title', e.target.value)} className={style.search} type="text" placeholder='Enter The Book Title' />
                        <div onClick={() => getBooksByForm()}></div>
                    </div>

                    <div className={style.case}>
                        <div>
                            <p>Categories</p>
                            <select onChange={(e) => changeInputsForm('subject', e.target.value)}>
                                <option value="all">all</option>
                                <option value="art">art</option>
                                <option value="biography">biography</option>
                                <option value="computers">computers</option>
                                <option value="history">history</option>
                            </select>
                        </div>
                        <div>
                            <p>Sorting by</p>
                            <select onChange={(e) => changeInputsForm('sorting', e.target.value)}>
                                <option value="relevance">relevance</option>
                                <option value="newest">newest</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
