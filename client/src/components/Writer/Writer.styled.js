import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  /* background: #000; */
`;

export const Wrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-top: 0px;
  }
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const SideNav = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    overflow-x: hidden;
    width: 100%;
    left: 0;
  }

  position: absolute;
  left: 40px;

  .side-list {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    background-color: white;
    padding: 10px;
  }

  .side-item {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin: 0 5px;
      margin-bottom: 0px;
    }

    width: 50px;
    height: 50px;
    background: #000;
    margin-bottom: 10px;
  }
`;

export const Main = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 450px;
    height: 450px;
    margin-top: 80px;
  }

  width: 500px;
  height: 500px;
  transition: all 0.3s;

  .drawing-paper {
    width: 100%;
    height: 100%;
    background-image: url(https://img.hankyung.com/photo/202208/03.31024910.1.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
