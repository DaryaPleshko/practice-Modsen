import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import InfoBooks from '../pages/InfoBooks/InfoBooks';

export const RoutesTest = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/info" element={<InfoBooks />} />
    </Routes>
  );
};
