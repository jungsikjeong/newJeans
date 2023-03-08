import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as S from '../common/Auth.styled';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import SliderCompo from '../Slider';
import Button from '../Button';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { loadUser } from '../../store';

const Container = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    top: 0;
  }
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  width: 100%;
  background: transparent;
  overflow: hidden;
  z-index: 10;
`;

const Edit = ({ user, handleEditModeChange }) => {
  const inputRef = useRef([]);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nickname: user.nickname,
    password: '',
  });
  const [passwordMode, setPasswordMode] = useState(false);

  const [message, setMessage] = useState('');
  const [styles, setStyles] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

  const { nickname, password } = formData;

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

    if (nickname.length === 0) {
      inputRef.current[1].focus();
      return setMessage('닉네임을 입력해주세요');
    }
    if (nickname.length === '') {
      inputRef.current[1].focus();
      return setMessage('닉네임을 입력해주세요');
    }
    if (nickname.length === 1 || nickname.length >= 7) {
      inputRef.current[1].focus();
      return setMessage('닉네임은 2~6글자로 해주세요');
    }

    if (passwordMode) {
      if (password.length < 6) {
        inputRef.current[2].focus();
        return setMessage('비밀번호는 6글자이상 입력해주세요');
      }
      if (password.length > 6) {
        inputRef.current[2].focus();
        return setMessage('비밀번호는 6글자까지만 입력해주세요');
      }
    }

    axios({
      method: 'post',
      url: '/api/users/edit/profile',
      data: {
        nickname,
        password,
        avatar,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/auth')
            .then((res) =>
              dispatch(
                loadUser(res.data.user),
                handleEditModeChange(),
                alert('정보가 변경되었습니다.')
              )
            );
        }
      })
      .catch((err) => {
        setMessage(err.response.data.errors.msg);
      });
  };

  useEffect(() => {
    if (passwordMode) {
      if (nickname && password) {
        setStyles(true);
      }

      if (nickname === '' || password === '') {
        setStyles(false);
      }
    } else {
      if (nickname) {
        setStyles(true);
      }

      if (nickname === '') {
        setStyles(false);
      }
    }
  }, [passwordMode, nickname, password]);

  return (
    <Container>
      <S.Wrapper className='fade-item'>
        <S.IconWrap onClick={() => handleEditModeChange()}>
          <GrClose />
        </S.IconWrap>

        <SliderCompo handleAvatarChange={handleAvatarChange} avatar={avatar} />

        <S.Form onSubmit={(e) => handleSubmit(e)}>
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
          {!passwordMode && (
            <Button
              className='edit'
              type='button'
              onClick={(e) => setPasswordMode(!passwordMode)}
            >
              비밀번호변경
            </Button>
          )}
          {passwordMode && (
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
          )}
          {message && <p className='alert'>{message}</p>}
          <Button
            className='register'
            color={styles.toString() === 'true' ? 'true' : ''}
            background={styles.toString() === 'true' ? 'true' : ''}
          >
            변경하기
          </Button>
        </S.Form>

        {!passwordMode ? (
          <S.Guide>변경할 닉네임을 입력해주세요.. </S.Guide>
        ) : (
          <S.Guide>변경할 닉네임과 비밀번호를 입력해주세요.. </S.Guide>
        )}
      </S.Wrapper>
    </Container>
  );
};

export default Edit;
