import styled from 'styled-components';
import noPost from '../../assets/images/noPost.jpg';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  img {
    width: 100%;
    max-width: 500px;
    height: 100%;
  }
`;

const NotPosts = () => {
  return (
    <Container>
      <Wrapper className='fade-item'>
        <img src={noPost} alt='' />
      </Wrapper>
    </Container>
  );
};

export default NotPosts;
