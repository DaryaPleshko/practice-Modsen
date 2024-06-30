// import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../Select';
import style from './style.module.scss';
import { useSearchBooks } from '../../context/useSearchBooks';

const categoryOptions = [
  { value: 'all', label: 'all' },
  { value: 'art', label: 'art' },
  { value: 'biography', label: 'biography' },
  { value: 'computers', label: 'computers' },
  { value: 'history', label: 'history' },
  { value: 'medical', label: 'medical' },
  { value: 'poetry', label: 'poetry' },
];

const categorySorting = [
  { value: 'relevance', label: 'relevance' },
  { value: 'newest', label: 'newest' },
];

const Header = ({ form, setForm }) => {
  const searchBooks = useSearchBooks();

  const changeInputsForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const getBooksByForm = async () => {
    searchBooks();
  };

  return (
    <header className={style.background}>
      <div className={style.wrapper}>
        <p className={style.name}>
          <b>Search for books</b>
        </p>
        <div className={style.searchWrapper}>
          <div className={style.searchContainer}>
            <input
              onChange={e => changeInputsForm('title', e.target.value)}
              className={style.search}
              type="text"
              placeholder="Enter The Book Title"
            />
            <div onClick={() => getBooksByForm()}></div>
          </div>

          <div className={style.case}>
            <Select options={categoryOptions} label="Categories" setCurrentOption={e => changeInputsForm('subject', e.target.value)} />
            <Select options={categorySorting} label="Sorting by" setCurrentOption={e => changeInputsForm('sorting', e.target.value)} />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  form: PropTypes.shape({
    title: PropTypes.string,
    subject: PropTypes.string,
    sorting: PropTypes.string,
  }).isRequired,
  setForm: PropTypes.func.isRequired,
};

export { Header };
