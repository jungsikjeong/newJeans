import styled from 'styled-components';
import Button from '../Button';
import { CardFooter, Col, InnerItem, Row } from '../common/Card.styled';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPage = () => {
  return (
    <Container>
      <Wrapper>
        <Button background='tomato'>편집하기</Button>
      </Wrapper>
      {/* 여태 내가 작성한 글들 */}
      <Row>
        <Col className='fade-item'>
          <img
            src='https://coinpan.com/files/attach/images/198/351/549/319/0f34315e421b2158f28033de6e93dde5.jpg'
            alt=''
          />
          <InnerItem className='fade-item'>
            <div>
              <h4>타이틀</h4>
              <p>바디</p>
            </div>
            <CardFooter>데이트</CardFooter>
          </InnerItem>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPage;
