import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './components/common/Global';
import Header from './components/Header';
import MyPage from './components/MyPage';
import Register from './components/Register';
import CardDeco from './components/CardDeco';
import Login from './components/Login';
import Home from './components/Home';
import Writer from './components/Writer';
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
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    setLoading(true);
    /**토큰으로 유저 정보를 user state에 담아줌 */
    if (token) {
      setAuthToken(JSON.parse(localStorage.token));
      axios
        .get('/api/auth')
        .then((res) => dispatch(loadUser(res.data.user), setLoading(false)));
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
          <Route path='/decoration' element={<CardDeco user={user} />} />
          <Route path='/writer' element={<Writer user={user} />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
