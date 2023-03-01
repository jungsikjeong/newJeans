import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
  /* height: 230px; */
  background: white;
  position: absolute;
  left: 140px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const Header = styled.header`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  font-weight: bold;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
`;

const SideMenu = ({ children, title }) => {
  return (
    <Container>
      <Header>{title}</Header>

      {children}
    </Container>
  );
};

export default SideMenu;
