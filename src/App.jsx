import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import InfoBooks from './pages/InfoBooks/InfoBooks';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/info-books/:bookId',
    element: <InfoBooks />,
  },
];

const App = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default App;
