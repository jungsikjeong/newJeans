import * as S from '../common/Auth.styled';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import Button from '../Button';
import SliderCompo from '../Slider';

const Login = () => {
  const [formData, setFormData] = useState({
    userId: '',

    password: '',
  });

  const { userId, password } = formData;
  const [styles, setStyles] = useState(false);

  const navigator = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
