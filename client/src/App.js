import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './components/styles/Global';
import Home from './components/Home';
import Writer from './components/Writer';
import MyPage from './components/MyPage';
import Header from './components/Header';

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
          <Route path='/writer' element={<Writer />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
