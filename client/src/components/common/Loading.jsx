import styled from 'styled-components';
import loading from '../../assets/images/loading.gif';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  img {
    width: 100%;
    max-width: 100px;
    height: 100%;
    border-radius: 50%;
  }
`;

const Loading = () => {
  return (
    <Container>
      <Wrapper>
        <img src={loading} alt='' />
      </Wrapper>
    </Container>
  );
};

export default Loading;
