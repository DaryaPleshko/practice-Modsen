import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';
import { Home } from './pages/Home';
import { InfoBooks } from './pages/InfoBooks';

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
