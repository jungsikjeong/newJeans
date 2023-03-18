import React, { useEffect } from 'react';
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
import Search from './components/Search';

import { useDispatch, useSelector } from 'react-redux';
import EditPostPage from './components/Edit/EditPostPage';
import { fetchByAuth } from './store/authSlice';

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
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // api.get('/auth').then((res) => dispatch(loadUser(res.data.user)));
    dispatch(fetchByAuth());
  }, []);

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
          <Route path='/mypage' element={<MyPage user={user} />} />
          <Route path='/edit/post/:id' element={<EditPostPage user={user} />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
