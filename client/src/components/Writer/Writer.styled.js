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
    background: red;
    margin-bottom: 10px;
  }
`;

export const Main = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 450px;
    height: 450px;
    margin-top: 80px;
  }

  transition: all 0.3s;
  /* background-color: ${(props) => (props.backgroundColor ? 'white' : '')}; */

  .drawing-paper {
    width: 100%;
    height: 100%;

    /* background-image: url(https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/10/08/b0bb64c1-989a-4ff6-abeb-fd92e81eda16.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    outline: none; */
  }
`;
