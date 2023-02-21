import {
  Item,
  List,
  Login,
  Logo,
  Menu,
  MenuItem,
  MenuList,
  StyleHeader,
} from './Header.styled';

import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { Button } from '../common/Button.styled';

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        <div className='user-wrap' onClick={() => navigate('/login')}>
          Login
          {/* onClick={() => handleMenu()} */}
          {/* 로그인시,About으로 변경할 예정*/}
        </div>
        <div>
          <FiSearch
            className='search-icon'
            onClick={() => navigate('/search')}
          />
        </div>
      </Login>

      {isOpen && (
        <Menu className={isMenu ? 'open' : 'close'}>
          <MenuList className={isMenu ? 'show' : 'hide'}>
            <MenuItem>
              <span className='name'>정중식, welcome! </span>
            </MenuItem>

            <MenuItem>
              <Button
                backgroundColor='#00AE68'
                shadowColor='#007503'
                onClick={() => navigate('/writer')}
              >
                카드작성
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                backgroundColor='#FFAA40'
                // onClick={() => navigate('/mypage')}
              >
                마이페이지
              </Button>
            </MenuItem>
            <MenuItem>
              <Button backgroundColor='tomato'>로그아웃</Button>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </StyleHeader>
  );
};

export default Header;
