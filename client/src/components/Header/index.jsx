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
import { useDispatch } from 'react-redux';
import { clearPosts, logout } from '../../store';
import { fetchSearchItem } from '../../store/postsSlice';

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

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // 메뉴 open,close
  const handleMenu = () => {
    // className = isMenu ? 'true':'false';, 스르륵열리고 닫히는 css
    setIsMenu(isMenu ? false : true);

    /** 메뉴가 열려있을때 */
    if (isOpen) {
      setTimeout(() => {
        // 닫힘
        // setIsOpen((false));
        setIsOpen((prev) => !prev);
      }, 300);
    } else {
      // 열림
      setIsOpen((prev) => !prev);
      // setIsOpen(true);
    }
  };

  const handlePageMove = (address) => {
    setIsOpen(false);
    setIsMenu(false);
    navigate(address);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    dispatch(logout());
    setIsOpen(false);
    setIsMenu(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    const text = e.target.textContent;
    dispatch(clearPosts());
    dispatch(fetchSearchItem(text));
  };

  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    /** user.avatar에 따라서 이미지변환 */
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
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/decoration'
      }
    >
      <Logo className='fade-item' onClick={() => window.location.replace('/')}>
        <h1>NewJeans</h1>
      </Logo>

      <List show={location.pathname === '/'}>
        <Item color='#f7e600' onClick={(e) => handleSearch(e)}>
          <span>민지</span>
        </Item>
        <Item color='#FFBFBF' onClick={(e) => handleSearch(e)}>
          <span>하니</span>
        </Item>
        <Item color='#d8d2c6' onClick={(e) => handleSearch(e)}>
          <span>해린</span>
        </Item>
        <Item color='#D0FC5C' onClick={(e) => handleSearch(e)}>
          <span>다니엘</span>
        </Item>
        <Item color='#9EE0FF' onClick={(e) => handleSearch(e)}>
          <span>혜인</span>
        </Item>
      </List>

      <Login>
        <div className='user-wrap'>
          {user && user ? (
            <>
              {headerImg && (
                <Img
                  src={headerImg}
                  alt=''
                  onClick={() => handleMenu()}
                  styleSize={
                    location.pathname === '/mypage' ||
                    location.pathname === '/search'
                  }
                />
              )}
            </>
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
                backgroundColor='#ec6d71'
                shadowColor='#f7c8ca'
                onClick={() => handlePageMove('/decoration')}
              >
                카드꾸미기
              </Button>
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
