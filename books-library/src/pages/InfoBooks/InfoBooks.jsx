import style from './style.module.css'
import React from 'react';
import Header from '../../components/Header/Header';

const InfoBooks = () => {
    return (
        <>
            <Header />
            <div className={style.containerInfo}>
                <div className={style.caseImg}>
                    <div className={style.imageBook}></div>
                </div>
                <div className={style.caseInfo}>
                    <p className={style.categoriesBook}>Art / General</p>
                    <p className={style.titleBook}><b>J. S. Bach The Goldberg Variations in Open Score</b></p>
                    <p className={style.authorBook}>Kendall Durelle Briggs</p>
                    <div><p className={style.aboutBook}><b>An open score edition of Bach's Goldberg Variations</b></p></div>
                </div>
            </div>
        </>
    );
};

export default InfoBooks;
