import { createRef, useEffect, useState } from 'react';
import { CardFooter, Col, InnerItem, Row } from './styles/Card.styled';

const Card = () => {
  const [list, setList] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

  const fadeCol = Array.from({ length: list.length }).map(() => createRef());

  useEffect(() => {
    var num = 500;

    for (let i = 0; i < list.length; i++) {
      fadeCol[i].current.style.animationDelay = `${num}ms`;
      num += 75;
    }
  }, []);

  //   FFBFBF
  // f7e600
  // F7FCFF
  // D0FC5C
  // 9EE0FF
  return (
    <Row>
      {list.map((item, index) => (
        <Col className='fade-col' ref={fadeCol[index]} key={index}>
          <img
            src='http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/c5cd0937-06c6-4f4c-9f22-660c5ec8adfb.jpg'
            alt=''
          />
          <InnerItem className='fade-item'>
            <div>
              <h4>민지입니다</h4>
              <p>어텐션부터시작해서 너무 팬입니다.</p>
            </div>
          </InnerItem>
          <CardFooter>23.1.28</CardFooter>
        </Col>
      ))}
    </Row>
  );
};

export default Card;
