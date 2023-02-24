import {
  Img,
  Item,
  List,
  Login,
  Logo,
  Menu,
  MenuItem,
  MenuList,
  StyleHeader,
} from './Header.styled';

import img01 from '../../assets/images/민지header.png';
import img02 from '../../assets/images/하니header.png';
import img03 from '../../assets/images/다니엘header.png';
import img04 from '../../assets/images/해린header.png';
import img05 from '../../assets/images/혜인header.png';

import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Button } from '../common/Button.styled';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [headerImg, setheaderImg] = useState('');

  const [members, setMembers] = useState([
    {
      name: '민지',
      src: img01,
    },
    {
      name: '하니',
      src: img02,
    },
    {
      name: '다니엘',
      src: img03,
    },
    {
      name: '해린',
      src: img04,
    },
    {
      name: '혜인',
      src: img05,
    },
  ]);

  const { user } = useSelector((state) => state.auth);

  console.log('user', user);
  const navigate = useNavigate();
  const location = useLocation();

  // 메뉴 open,close
  const handleMenu = () => {
    setIsMenu(!isMenu);

    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handlePageMove = (address) => {
    setIsOpen(false);
    navigate(address);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    // axios.get('/api/auth/logout');
  };

  useEffect(() => {
    /**user.avatar에 따라서 이미지변환 */
    if (user) {
      members.map((member) => {
        const index = user.avatar.indexOf(member.name);

        if (index !== -1) {
          setheaderImg(member.src);
        }
      });
    }
  }, [headerImg, members, user]);

  return (
    <StyleHeader
      disabled={
        location.pathname === '/login' || location.pathname === '/register'
      }
    >
      <Logo onClick={() => navigate('/')}>
        <h1>NewJeans</h1>
      </Logo>

      <List>
        <Item color='#FFBFBF'>
          <span>하니</span>
        </Item>
        <Item color='#f7e600'>
          <span>민지</span>
        </Item>
        <Item color='#d8d2c6'>
          <span>해린</span>
        </Item>
        <Item color='#D0FC5C'>
          <span>다니엘</span>
        </Item>
        <Item color='#9EE0FF'>
          <span>혜인</span>
        </Item>
      </List>

      <Login>
        <div className='user-wrap'>
          {user && user ? (
            <Img src={headerImg} alt='' onClick={() => handleMenu()} />
          ) : (
            <span onClick={() => navigate('/login')}>Login</span>
          )}
        </div>
        <div className='icon-wrap'>
          <FiSearch
            className='search-icon'
            onClick={() => navigate('/search')}
          />
        </div>
      </Login>

      {user && isOpen && (
        <Menu className={isMenu ? 'open' : 'close'}>
          <MenuList className={isMenu ? 'show' : 'hide'}>
            <MenuItem>
              <span className='name'>{user.nickname}님, welcome! </span>
            </MenuItem>

            <MenuItem>
              <Button
                backgroundColor='#00AE68'
                shadowColor='#007503'
                onClick={() => handlePageMove('/writer')}
              >
                카드작성
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                backgroundColor='#FFAA40'
                onClick={() => handlePageMove('/mypage')}
              >
                마이페이지
              </Button>
            </MenuItem>
            <MenuItem>
              <Button backgroundColor='tomato' onClick={() => handleLogout()}>
                로그아웃
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </StyleHeader>
  );
};

export default Header;
