import React, { useEffect } from 'react';
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

import { loadUser } from './store';
import setAuthToken from './utils/setAuthToken';
import axios from 'axios';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setAuthToken(JSON.parse(localStorage.token));
      axios.get('/api/auth').then((res) => dispatch(loadUser(res.data.user)));
    }
  }, [token, dispatch]);

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
