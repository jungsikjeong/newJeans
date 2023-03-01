import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  /* overflow: hidden; */
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
    z-index: 100;
  }

  position: absolute;
  left: 40px;

  .side-list {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    padding: 20px 10px;
    background-color: white;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  }

  .side-item {
    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin: 0 5px;
      margin-bottom: 0px;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    font-size: 30px;
    transition: all 0.3s;
    color: black;

    cursor: pointer;

    .icon {
      transition: all 0.3s;
      height: 100%;
    }

    .icon:hover {
      transform: scale(1.2);
    }

    span {
      text-align: center;
      color: black;
      font-size: 12px;
    }
  }
`;

export const Main = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 350px;
    height: 450px;
    margin-top: 100px;
  }

  transition: all 0.3s;
  background-color: ${(props) => (props.backgroundColor ? 'white' : '')};
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;
