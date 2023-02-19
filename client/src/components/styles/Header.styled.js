import styled, { keyframes } from 'styled-components';

export const menuOpenFrames = keyframes`
 0% {
  transform: translateY();
      height: 0px;
    }
    50% {
      height: 250px;
    }
    100% {
      height: 300px;
    }
`;
export const menuCloseFrames = keyframes`
0% {
      height: 300px;
    }
    50% {
      height: 250px;
    }
    100% {
      height: 0px;
    }
`;

export const StyleHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f5f2;
  height: 40px;
  padding: 0px 10px;
`;

export const Logo = styled.div`
  @media (max-width: ${({ theme }) => theme.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.5rem;
  }

  display: flex;
  align-items: center;
  height: 100%;
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: -3px;
  cursor: pointer;
`;

export const List = styled.ul`
  @media (max-width: ${({ theme }) => theme.tablet}) {
    padding: 0;
  }

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 50px;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 25px;
  cursor: pointer;

  ::before {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin: 0;
    }
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: ${(props) => props.color};
    border-radius: 50%;
    margin-right: 5px;
  }

  span {
    @media (max-width: ${({ theme }) => theme.tablet}) {
      font-size: 20px;
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
      display: none;
    }

    display: flex;
    align-items: center;

    &:hover {
      font-weight: bold;
      transition-duration: 0.3s;
    }
  }
`;

export const Login = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 20px;
  }

  display: flex;
  text-align: center;
  font-size: 25px;
  cursor: pointer;

  .user-wrap {
    margin-right: 7px;
    transition: 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }

  .search-icon {
    transition: 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;

  /* height: 0%; */
  z-index: 2;
  background: #f9f5f2;

  &.open {
    animation: ${menuOpenFrames} 0.3s linear forwards;
  }

  &.close {
    animation: ${menuCloseFrames} 0.3s linear forwards;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-size: 25px;

  &.show {
    display: flex;
  }
  &.hide {
    display: none;
  }
`;
export const MenuItem = styled.li`
  display: flex;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  & span::before {
    content: '';
    display: block;
    width: 15px;
    height: 15px;
    background: gray;
    border-radius: 50%;
    margin-right: 5px;
  }

  span {
    display: flex;
    align-items: center;
    letter-spacing: -0.3px;
    font-size: 1.56rem;
  }
`;
