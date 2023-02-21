import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './components/common/Global';
import Header from './components/Header';
import MyPage from './components/MyPage';
import Register from './components/Register';
import Writer from './components/Writer';
import Login from './components/Login';
import Home from './components/Home';
import Search from './components/Search/Search';

const theme = {
  colors: {
    // header: '#ebfbff',
    // body: '#fff',
    // footer: '#003333',
  },
  tablet: '1024px',
  mobile: '768px',
};

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/writer' element={<Writer />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
