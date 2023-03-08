import * as S from '../common/Auth.styled';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import img1 from '../../assets/images/민지.jpg';

import Button from '../Button';
import SliderCompo from '../Slider';
import { useDispatch, useSelector } from 'react-redux';
import setAuthToken from '../../utils/setAuthToken';
import { loadUser } from '../../store';

const Register = () => {
  const [formData, setFormData] = useState({
    userId: '',
    nickname: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const { userId, nickname, password } = formData;
  const [styles, setStyles] = useState(false);
  const [avatar, setAvatar] = useState(img1);

  const inputRef = useRef([]);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/\s/g, ''),
    });
    setMessage('');
  };

  const handleAvatarChange = (data) => {
    setAvatar(data.src);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || userId === '') {
      inputRef.current[0].focus();
      return setMessage('유저 아이디를 입력해주세요');
    }
    if (userId.length < 4) {
      inputRef.current[0].focus();
      return setMessage('아이디가 너무 짧아요!(최소4글자)');
    }
    if (userId.length > 13) {
      inputRef.current[0].focus();
      return setMessage('아이디가 너무 길어요!(최대12글자)');
    }
    if (!nickname || nickname === '') {
      inputRef.current[1].focus();
      return setMessage('닉네임을 입력해주세요');
    }
    if (nickname.length === 1 || nickname.length >= 7) {
      inputRef.current[1].focus();
      return setMessage('닉네임은 2~6글자로 해주세요');
    }
    if (password.length < 6) {
      inputRef.current[2].focus();
      return setMessage('비밀번호는 6글자이상 입력해주세요');
    }
    if (password.length > 6) {
      inputRef.current[2].focus();
      return setMessage('비밀번호는 6글자까지만 입력해주세요');
    }

    axios({
      method: 'post',
      url: '/api/auth/register',
      data: {
        userId,
        nickname,
        password,
        avatar,
      },
    })
      .then((res) => {
        if (res.data?.token) {
          localStorage.setItem('token', JSON.stringify(res.data.token));
          setAuthToken(JSON.parse(localStorage.token));

          axios
            .get('/api/auth')
            .then((res) => dispatch(loadUser(res.data.user), navigator('/')));
        }
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setMessage(err.response.data.errors[0].msg);
      });
  };

  useEffect(() => {
    if (userId && nickname && password) {
      setStyles(true);
    }

    if (userId === '' || nickname === '' || password === '') {
      setStyles(false);
    }
  }, [userId, nickname, password]);

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <S.Container>
      <S.Wrapper className='fade-item'>
        <S.IconWrap onClick={() => navigator('/')}>
          <GrClose />
        </S.IconWrap>

        <SliderCompo handleAvatarChange={handleAvatarChange} />

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
            <S.Label htmlFor='user-nickname' userId={formData.nickname}>
              Nickname
            </S.Label>
            <S.Input
              type='text'
              id='user-nickname'
              name='nickname'
              value={formData.nickname}
              onChange={(e) => handleChange(e)}
              ref={(el) => (inputRef.current[1] = el)}
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
              ref={(el) => (inputRef.current[2] = el)}
            />
          </S.FormGroup>
          {message && <p className='alert'>{message}</p>}
          <Button
            className='register'
            color={styles.toString() === 'true' ? 'true' : ''}
            background={styles.toString() === 'true' ? 'true' : ''}
          >
            가입하기
          </Button>
        </S.Form>
        <S.Guide>
          Already have an ID?{' '}
          <span onClick={() => navigator('/login')}>Sign In</span>
        </S.Guide>
      </S.Wrapper>
    </S.Container>
  );
};

export default Register;
