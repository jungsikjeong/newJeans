import * as S from '../common/Auth.styled';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import Button from '../Button';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { userId, password } = formData;
  const [styles, setStyles] = useState(false);

  const inputRef = useRef([]);
  const navigator = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || userId === '') {
      inputRef.current[0].focus();
      return setMessage('유저 아이디를 입력해주세요!');
    }

    if (userId.length < 4) {
      inputRef.current[0].focus();
      return setMessage(`아이디가 너무 짧아요! (최소 4글자)`);
    }
    if (userId.length > 12) {
      inputRef.current[0].focus();
      return setMessage(`아이디가 너무 길어요! (최대 12글자)`);
    }

    if (!password || password === '') {
      inputRef.current[1].focus();
      return setMessage('비밀번호를 입력해주세요!');
    }

    axios({
      method: 'post',
      url: '/api/auth/login',
      data: {
        userId,
        password,
      },
    })
      .then((res) => {
        if (res.data?.token) {
          navigator('/');
        }
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setMessage(err.response.data.errors[0].msg);
      });
  };

  useEffect(() => {
    if (userId && password) {
      setStyles(true);
    }

    if (userId === '' || password === '') {
      setStyles(false);
    }
  }, [userId, password]);

  return (
    <S.Container>
      <S.Wrapper className='fade-item'>
        <S.IconWrap onClick={() => navigator('/')}>
          <GrClose />
        </S.IconWrap>

        <S.Form onSubmit={(e) => handleSubmit(e)}>
          <S.FormGroup>
            <S.Label htmlFor='user-id' userId={formData.userId}>
              ID
            </S.Label>
            <S.Input
              type='text'
              id='user-id'
              name='userId'
              value={formData.userId}
              onChange={(e) => handleChange(e)}
              ref={(el) => (inputRef.current[0] = el)}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor='user-pw' userId={formData.password}>
              Password
            </S.Label>
            <S.Input
              type='password'
              id='user-pw'
              name='password'
              value={formData.password}
              onChange={(e) => handleChange(e)}
              ref={(el) => (inputRef.current[1] = el)}
            />
          </S.FormGroup>

          {message && <S.Message>{message}</S.Message>}

          <Button
            className='register'
            color={styles.toString() === 'true' ? 'true' : ''}
          >
            로그인하기
          </Button>
        </S.Form>
        <S.Guide>
          Don't have an ID?
          <span onClick={() => navigator('/register')}> Register</span>
        </S.Guide>
      </S.Wrapper>
    </S.Container>
  );
};

export default Login;
