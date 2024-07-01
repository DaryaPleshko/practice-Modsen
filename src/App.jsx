import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { InfoBooks } from './pages/InfoBooks';
import ErrorBoundary from './ErrorBoundary';

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
        <Route key={index} path={route.path} element={<ErrorBoundary fallback={<p>Something went wrong</p>}>{route.element}</ErrorBoundary>} />
      ))}
    </Routes>
  );
};

export { App };
