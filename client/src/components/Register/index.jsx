import * as S from '../styles/Auth.styled';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import Button from '../Button';
import SliderCompo from '../Slider';
const Register = () => {
  const [formData, setFormData] = useState({
    userId: '',
    nickname: '',
    password: '',
  });

  const { userId, nickname, password } = formData;
  const [styles, setStyles] = useState(false);

  const navigator = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userId && nickname && password) {
      setStyles(true);
    }

    if (userId === '' || nickname === '' || password === '') {
      setStyles(false);
    }
  }, [userId, nickname, password]);

  return (
    <S.Container>
      <S.Wrapper className='fade-item'>
        <S.IconWrap onClick={() => navigator('/')}>
          <GrClose />
        </S.IconWrap>
        <SliderCompo />
        <S.Form>
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
            />
          </S.FormGroup>
          <Button
            className='register'
            color={styles.toString() === 'true' ? 'true' : ''}
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
