import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    top: 62px;
    left: 0;
    overflow: scroll;
  }
  width: 300px;
  background: white;
  position: absolute;
  left: 140px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const SideMenu = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SideMenu;
