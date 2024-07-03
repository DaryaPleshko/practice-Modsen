import { useSearchBooks } from '../../context/useSearchBooks';
import { iForm } from '../../interface';
import { Select } from '../Select';
import style from './style.module.scss';

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

interface HeaderProps {
  form: iForm;
  setForm: (param: iForm) => void;
}

const Header: React.FC<HeaderProps> = ({ form, setForm }) => {
  const searchBooks = useSearchBooks();

  const changeInputsForm = (key: string, value: string) => {
    console.log(`Changing ${key} to ${value}`);
    setForm({ ...form, [key]: value });
  };

  const getBooksByForm = async () => {
    console.log('Form data:', form);
    if (searchBooks) {
      await searchBooks(form);
    }
  };

  return (
    <header className={style.background}>
      <div className={style.wrapper}>
        <h1 className={style.name}>
          <b>Search for books</b>
        </h1>
        <div className={style.searchWrapper}>
          <form
            className={style.searchContainer}
            onSubmit={e => {
              e.preventDefault();
              getBooksByForm();
            }}
          >
            <input
              onChange={e => changeInputsForm('title', e.target.value)}
              className={style.search}
              type="text"
              placeholder="Enter The Book Title"
            />
            <div onClick={() => getBooksByForm()}></div>
          </form>

          <div className={style.case}>
            <Select options={categoryOptions} label="Categories" setCurrentOption={value => changeInputsForm('subject', value)} />
            <Select options={categorySorting} label="Sorting by" setCurrentOption={value => changeInputsForm('sorting', value)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
