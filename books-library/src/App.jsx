import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import InfoBooks from './pages/InfoBooks/InfoBooks';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info-books/:bookId" element={<InfoBooks />} />
    </Routes>
  );
};

export default App;





// import React, { useState, useEffect } from 'react';
// import GoogleAuth from './components/GoogleAuth/GoogleAuth';
// import Home from './pages/Home/Home';
// import InfoBooks from './pages/InfoBooks/InfoBooks';

// const App = () => {
// const [token, setToken] = useState(null);

// useEffect(() => {
//   console.log(token);
// }, [token])

// return (
//   <div>
{/* <h1>Google Books API</h1> */ }
{/* <Home></Home>
      <InfoBooks></InfoBooks> */}
{/* <GoogleAuth setToken={setToken} /> */ }
{/* {token && <Home token={token} />} */ }
{/* </div>
  );
};

export default App; */}



