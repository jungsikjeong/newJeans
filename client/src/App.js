import React from 'react';
import { Routes, Route } from 'react-router-dom';

import GlobalStyles from './components/styles/Global';
import Home from './components/Home';
import Writer from './components/Writer';
import MyPage from './components/MyPage';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/writer' element={<Writer />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
